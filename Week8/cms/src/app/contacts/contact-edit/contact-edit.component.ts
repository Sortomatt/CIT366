import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  id: string;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  originalContact: Contact;
  editMode = false;
  hasGroup = false;
  invalidGroupContact: boolean;

  constructor( private contactService: ContactService,
               private route: ActivatedRoute,
               private router: Router,

  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          if (this.id === undefined || this.id === null) {
            this.editMode = false;
            return;
          }
          this.contactService.getContact(this.id)
          .subscribe(res => {
            this.originalContact = res.contact;
          });
          if (this.originalContact === undefined || this.originalContact === null) {
            this.editMode = false;
            return;
          }
          this.editMode = true;
          if (this.contact.group && this.contact.group.length > 0) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
            // this.groupContacts = this.contact.group.slice();
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }
onCancel() {
  this.router.navigate(['/contacts']);
}
isInvalidContact(newContact: Contact) {
  if (!newContact) {
    return true;
  }
  if (newContact.id === this.contact.id) {
    return true;
  }
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.groupContacts.length; i++) {
    if (newContact.id === this.groupContacts[i]. id) {
      return true;
    }
  }
  return false;
}

addToGroup($event: any) {
  // tslint:disable-next-line: prefer-const
  let selectedContact: Contact = $event.dragData;
  this.invalidGroupContact = this.isInvalidContact(selectedContact);
  if ( this.invalidGroupContact) {
    return;
  }
  this.groupContacts.push(selectedContact);
  this.invalidGroupContact = false;
}
onRemoveItem(idx: number) {
if (idx < 0 || idx >= this.groupContacts.length) {
  return;
}
this.groupContacts.splice(idx, 1);
this.invalidGroupContact = false;
}
}
