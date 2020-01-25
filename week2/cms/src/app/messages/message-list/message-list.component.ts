import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message( 1, 'Rrrrobotnik ROCK', 'where did I go WRONG with you?!', 'Rrrrrobotnik'),
    new Message( 2, 'Brrrring, Brrring', 'Robotnik PHONE!', 'Robotnik PHONE'),
    new Message( 3, 'MICE', 'I never should of made mice!', 'Rrrrrobotnik'),


  ];
  constructor() { }

  ngOnInit() {
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
