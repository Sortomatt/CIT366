import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  // contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  // contactChangedEvent = new EventEmitter<Contact>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
   }

   getContact(id: string) {
     return this.http.get<{ message: string, contact: Contact }>('http://localhost:3000/contacts/' + id);
   }
  //  getContact(id: string): Contact {
  //    if (this.contacts) {
  //      this.getContacts();
  //    }
  //    for (const contact of this.contacts) {
  //      console.log(contact);
  //      if (contact.id === id) {
  //        return contact;
  //      }
  //    }
  //    return null;
  //  }

  //  getContacts() {
    //  return this.contacts.slice();
    // this.http
    // .get('https://week9-project.firebaseio.com/contacts.json')
    // .subscribe((contacts: Contact[]) => {
    //   this.contacts = contacts;
    //   this.maxContactId = this.getMaxId();
    //   this.contacts.sort((a, b) =>
    //   // tslint:disable-next-line: no-string-literal
    //   a['name'] ? 1 : a['name'] > b['name'] ? -1 : 0
    // );
    //   this.contactListChangedEvent.next(this.contacts.slice());
    // });
    getContacts() {
      //  return this.contacts.slice();
      this.http
      .get<{ message: string, contacts: Contact[]}>('http://localhost:3000/contacts/')
      .subscribe((responseData) => {
        this.contacts = responseData.contacts;
        this.contacts.sort((a, b) =>
            a["name"] < b["name"] ? 1 : a["name"] > b["name"] ? -1 : 0
          );
          this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.log(error)
      }
      );
   }

   storeContacts() {
     const contacts = JSON.stringify(this.contacts);

     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
     this.http.put(
      'https://week9-project.firebaseio.com/contacts.json',
      contacts
    )
    .subscribe(response => {
      console.log(response);
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }


   getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId;
    }
  }

   addContact(newContact: Contact) {
    if (newContact === undefined || newContact === null) {
      return;
      }
    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.storeContacts();
    // this.contactListChangedEvent.next(contactsListClone);
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
    this.storeContacts();
    // const documentsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(documentsListClone);
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
      this.storeContacts();
      // const contactsListClone = this.contacts.slice();
      // this.contactListChangedEvent.next(contactsListClone);

          }
        }
}
