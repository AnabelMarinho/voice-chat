import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}

  async enviarMensagem(pergunta: string): Promise<string> {
    const response$ = this.http.post<any>('api\chat', { pergunta });
    const response = await lastValueFrom(response$);
    return response.resposta;
  }
}
