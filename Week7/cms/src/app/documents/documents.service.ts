import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Contact } from '../contacts/contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
documentListChangedEvent = new Subject<Document[]>();
documentSelectedEvent = new EventEmitter<Document>();
documents: Document[] = [];
documentChangedEvent = new EventEmitter<Document[]>();
maxId = 0;
maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
     return this.documents.slice();
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

     addDocument(newDocument: Document) {
      if (newDocument === undefined || newDocument === null) {
        return;
        }
      this.maxDocumentId++;
      newDocument.id = String(this.maxDocumentId);
      this.documents.push(newDocument);
      const documentsListClone = this.documents.slice();

      this.documentListChangedEvent.next(documentsListClone);
     }

     updateDocument(originalDocument: Document, newDocument: Document) {
      if (originalDocument  === undefined || originalDocument === null
          || newDocument  === undefined || newDocument === null) {
        return;
      }
      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0) {
        return;
      }
      newDocument.id = originalDocument.id;
      this.documents[pos] = newDocument;
      const documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
     }

     deleteDocument(document: Document) {
      if (document === null || document === undefined) {
        return;
      }

      const pos = this.documents.indexOf(document); {
        if (pos < 0) {
          return;
      }
        this.documents.splice(pos, 1);
        const documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      }
     }
    }
