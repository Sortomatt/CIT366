import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService} from '../documents.service';
import { Params } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter <Document>();

  documents: Document[] = [];

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    // this.documents = this.documentService.getDocuments();
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent
    .subscribe(
      (documents: Document[]) => {
      this.documents = documents;
      }
    );

}

// public description: string, public url: string,
// public children: string)
