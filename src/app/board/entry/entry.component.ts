import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entry} from "../../entity/entry";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  @Input()
  public entry: Entry = new Entry('');

  public renaming: boolean = false;
  private entryContentBeforeRename?: string;

  @Output()
  public save: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public delete: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  startRenameEntry() {
    this.renaming = true;
    this.entryContentBeforeRename = this.entry.content;
  }

  stopRenameEntry() {
    if (this.entry.content !== this.entryContentBeforeRename) {
      console.log('Entry name changed - saving');
      this.saveEntry();
    }
    this.renaming = false;
  }

  saveEntry() {
    this.save.next(this.entry);
  }

  deleteEntry() {
    this.delete.next(this.entry);
  }
}
