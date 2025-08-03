import { Routes } from '@angular/router';
import { App } from './app';
import { ChatDousuarios } from './pages/chat-dousuarios/chat-dousuarios';

export const routes: Routes = [
  { path: '', component: App },           
  { path: 'chat', component: ChatDousuarios },
];
