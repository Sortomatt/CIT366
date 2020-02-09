import { Component, OnInit, ElementRef, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import {MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender = '18';
  messageId = '1';
  clearSubject;
  clearMsgText;
  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private mService: MessagesService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const ingSubject = this.subjectRef.nativeElement.value;
    const ingMsgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message( this.messageId, ingSubject, ingMsgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
    // const ingSender = this.currentSender;
    this.mService.addMessage (newMessage);
  }
  onClear() {
  this.clearSubject = document.getElementById('subject');
  this.clearMsgText = document.getElementById('message');
  this.clearSubject = '';
  this.clearMsgText = '';
  }
}
