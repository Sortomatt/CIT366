import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter <Document>();

  documents: Document[] = [
    new Document( 1, 'test Document', 'A test document', 'test url', 'test children'),
    new Document( 2, 'test Document', 'A test document', 'test url', 'test children'),
    new Document( 3, 'test Document', 'A test document', 'test url', 'test children'),
    new Document( 4, 'test Document', 'A test document', 'test url', 'test children'),
    new Document( 5, 'test Document', 'A test document', 'test url', 'test children'),
  ];

  constructor() { }

  ngOnInit() {
  }
onSelectedDocument(document: Document) {
  this.selectedDocumentEvent.emit(document);

}

}

// public description: string, public url: string,
// public children: string)
