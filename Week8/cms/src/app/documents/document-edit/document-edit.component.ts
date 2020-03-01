import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentsService } from '../documents.service';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  originalDocument: Document;
  document: Document;
  editMode = true;


  constructor( private documentService: DocumentsService,
               private router: Router,
               private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          if (this.id === undefined || this.id === null) {
            this.editMode = false;
            return;
          }
          this.originalDocument = this.documentService.getDocument(this.id);
          if ( this.originalDocument === undefined || this.originalDocument === null) {
            this.editMode = false;
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        });
  }

  // onSubmit(form: NgForm) {
  //   values = form.value // get values from form’s fields
  //   newDocument = new Document()
  //   Assign the values in the form fields to the
  //   corresponding properties in the newDocument
  //   if (editMode = true) then
  //    documentService.update(orignalDocument, newDocument)
  //   else
  //    documentService.add(newDocument)
  //   endIf
  //   route back to the '/documents' URL
  //   }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(value.id, value.name, value.description, value.documentUrl, value.children);

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
  onCancel() {
    this.router.navigate(['/documents']);
  }
}
