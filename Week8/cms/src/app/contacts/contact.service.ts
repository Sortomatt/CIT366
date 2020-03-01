import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  contactChangedEvent = new EventEmitter<Contact>();
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContact(id: string): Contact {
     for (const contact of this.contacts) {
       if (contact.id === id) {
         return contact;
       }
     }
     return null;
   }

   getContacts(): Contact[] {
     return this.contacts.slice();
   }

   addContact(newContact: Contact) {
    if (newContact === undefined || newContact === null) {
      return;
      }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();

    this.contactListChangedEvent.next(contactsListClone);
   }

   updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact  === undefined || originalContact === null
        || newContact  === undefined || newContact === null) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const documentsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(documentsListClone);
   }

   deleteContact(contact: Contact) {
    if (contact === null || contact === undefined) {
      return;
    }
    console.log(contact);
    const pos = this.contacts.indexOf(contact); {
      if (pos < 0) {
        return;
           }
      this.contacts.splice(pos, 1);
      const contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsListClone);

          }
        }
}
