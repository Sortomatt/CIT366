import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MessagesService {
messageListChangedEvent = new Subject<Message[]>();
// messageChangeEvent = new EventEmitter<Message[]>();
messages: Message[] = [];
maxMessageId: number;

  constructor(private http: HttpClient) {

    // this.messages = MOCKMESSAGES;

  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId;
    }
  }

getMessages() {
this.http.get('https://week9-project.firebaseio.com/messages.json')
.subscribe((messages: Message[]) => {
  this.messages = messages;
  console.log(this.messages);
  this.maxMessageId = this.getMaxId();
  this.messages.sort((a, b) =>
    // tslint:disable-next-line: no-string-literal
    a['name'] ? 1 : a['name'] > b['name'] ? -1 : 0
    );
  this.messageListChangedEvent.next(this.messages.slice());
});
}

storeMessages() {
  this.messages = JSON.parse(JSON.stringify(this.messages));

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  this.http.put(
    'https://week9-project.firebaseio.com/messages.json', this.messages
  )
  .subscribe(response => {
    console.log(response);
    this.messageListChangedEvent.next(this.messages.slice());
  });
}

  getMessage(id: string): Message {
    for (const messages of this.messages) {
      if (messages.id === id) {
        return messages;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageListChangedEvent.next(this.messages.slice());
    this.storeMessages();

  }

}
