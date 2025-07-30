import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './services/chat';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [ChatService]
})
export class App {
  voiceInput = signal('');
  carregando = signal(false);
  gravando = signal(false);
  mensagens = signal<{ autor: 'user' | 'ia'; conteudo: string }[]>([]);

  constructor(private chatService: ChatService) {}

  atualizarInput(valor: string) {
    this.voiceInput.set(valor);
  }

  async enviar() {
    const pergunta = this.voiceInput().trim();
    if (!pergunta) return;

    this.carregando.set(true);
    this.mensagens.update(msgs => [...msgs, { autor: 'user', conteudo: pergunta }]);

    try {
      const resposta = await this.chatService.enviarMensagem(pergunta);
      this.mensagens.update(msgs => [...msgs, { autor: 'ia', conteudo: resposta }]);
    } catch (e) {
      this.mensagens.update(msgs => [...msgs, { autor: 'ia', conteudo: 'Erro ao se comunicar com a IA.' }]);
    }

    this.voiceInput.set('');
    this.carregando.set(false);
  }

  startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Reconhecimento de voz não suportado neste navegador.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    this.gravando.set(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.atualizarInput(transcript);
      this.gravando.set(false);
    };

    recognition.onerror = () => {
      alert('Erro no reconhecimento de voz.');
      this.gravando.set(false);
    };

    recognition.onend = () => {
      this.gravando.set(false);
    };

    recognition.start();
  }

  onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  this.atualizarInput(target.value);
}

limparHistorico() {
  this.mensagens.set([]);  
  this.voiceInput.set('');
}


}
