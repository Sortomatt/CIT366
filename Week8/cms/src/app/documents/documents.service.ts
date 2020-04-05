import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Contact } from '../contacts/contact.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SortableComponent } from 'ng2-dnd';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documentListChangedEvent = new Subject<Document[]>();
  // documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  documentChangedEvent = new EventEmitter<Document[]>();
  // maxId = 0;
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        console.log('get documents ', document);
        return document;
      }
    }
    return null;
  }

  getDocuments() {
    this.http
      .get('https://week9-project.firebaseio.com/documents.json')
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        // this.maxDocumentId = this.maxDocumentId();
        // tslint:disable-next-line: no-string-literal
        this.documents.sort((a, b) =>
          // tslint:disable-next-line: no-string-literal
          a['name'] ? 1 : a['name'] > b['name'] ? -1 : 0
        );
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  storeDocuments() {
    const documents = JSON.stringify(this.documents);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http
      .put(
        'https://week9-project.firebaseio.com/documents.json',
        documents
      )
      .subscribe(response => {
        console.log(response);
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getMaxId(): number {
    let maxId = 0;
    for (const document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId;
    }
  }

  addDocument(document: Document) {
  if (!document) {
    return;
  }

  const headers = new HttpHeaders({
    'Content-type': 'application/json'
  });

  document.id = '';
  const strDocument = JSON.stringify(document);

  // tslint:disable-next-line: object-literal-shorthand
  this.http.post('http://localhost:3000/documents', strDocument, {headers: headers})
    // tslint:disable-next-line: align
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.documentListChangedEvent.next(this.documents.slice());
      });

    // if (newDocument === undefined || newDocument === null) {
    //   return;
    // }
    // this.maxDocumentId++;
    // newDocument.id = String(this.maxDocumentId);
    // this.documents.push(newDocument);
    // const documentsListClone = this.documents.slice();
    // this.storeDocuments();
    // this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);
    this.http.patch('http://localhost:3000/documents/' + originalDocument.id
                    , strDocument
                    // tslint:disable-next-line: object-literal-shorthand
                    , {headers: headers})
                    // tslint:disable-next-line: align
                    .subscribe(
                      (documents: Document[]) => {
                      this.documents = documents;
                      this.documentChangedEvent.next(this.documents.slice());
                    });
    // if (
    //   originalDocument === undefined ||
    //   originalDocument === null ||
    //   newDocument === undefined ||
    //   newDocument === null
    // ) {
    //   return;
    // }
    // const pos = this.documents.indexOf(originalDocument);
    // if (pos < 0) {
    //   return;
    // }
    // newDocument.id = originalDocument.id;
    // this.documents[pos] = newDocument;
    // this.storeDocuments();
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    this.http.delete('http://localhost:3000/documents/' + document.id)

      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });

    // if (document === null || document === undefined) {
    //   return;
    // }

    // const pos = this.documents.indexOf(document);
    // {
    //   if (pos < 0) {
    //     return;
    //   }
    //   this.documents.splice(pos, 1);
    //   this.storeDocuments();
      // const documentsListClone = this.documents.slice();
      // this.documentListChangedEvent.next(documentsListClone);
    }
  }

