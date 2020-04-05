import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender;
  canEdit = false;
  contact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    console.log(this.message);
    this.contactService.getContact(this.message.id)
      .subscribe(res => {
        this.contact = res.contact;
      });
    console.log(this.contact);
    this.messageSender = this.contact.name;
  }

}
