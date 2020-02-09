import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES} from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;

  }
  getMessage(id: string): Message {
    for (const messages of this.messages) {
      if (messages.id === id) {
        return messages;
      }
    }
    return null;
  }
  getMessages() {
    return this.messages.slice();
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

}
