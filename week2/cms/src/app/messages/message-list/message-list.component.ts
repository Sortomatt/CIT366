import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message( 1, 'Test Message', 'This is only a test', 'Test-bot'),
    new Message( 2, 'Another Test', 'A secondary test', 'Test-bot'),
    new Message( 3, 'A third', 'This concludes our test', 'Test-bot'),


  ];
  constructor() { }

  ngOnInit() {
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
