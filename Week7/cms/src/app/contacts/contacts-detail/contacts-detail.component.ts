import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  @Input() contact: Contact;
  id: string;

  constructor(private contactservice: ContactService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.contact = this.contactservice.getContact(this.id);
      }
    );
  }
onDelete() {
  this.contactservice.deleteContact(this.contact);
  this.router.navigate(['/contacts'], {relativeTo: this.route});
}
}
