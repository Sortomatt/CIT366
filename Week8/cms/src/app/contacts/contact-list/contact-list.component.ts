import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService} from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  term: string;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
  // this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  // onSelected(contact: Contact) {
  //   this.contactService.contactSelectedEvent.emit(contact);
  //   console.log('contact ', contact);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

   // tslint:disable-next-line: variable-name
   onKeyPress(value: string) {
    this.term = value;
   }
}
