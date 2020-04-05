import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService} from '../documents.service';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})

export class DocumentListComponent implements OnInit, OnDestroy {
  @Output() selectedDocumentEvent = new EventEmitter <Document>();
  private subscription: Subscription;

  documents: Document[] = [];

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe(
      (documents: Document[]) => {
      this.documents = documents;
      }
    );
}

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
}
