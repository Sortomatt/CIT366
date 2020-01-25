import { Component, OnInit, ElementRef, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = 'Matt Sortomme';
  messageId = 1;
  clearSubject;
  clearMsgText;
  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();



// public id: string;
// public subject: string;
// public msgText: string;
// public sender: string;

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const ingSubject = this.subjectRef.nativeElement.value;
    const ingMsgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message( this.messageId, ingSubject, ingMsgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
    const ingSender = this.currentSender;

  }
  onClear() {
  this.clearSubject = document.getElementById('subject');
  this.clearMsgText = document.getElementById('message');
  this.clearSubject = '';
  this.clearMsgText = '';
  }
}
