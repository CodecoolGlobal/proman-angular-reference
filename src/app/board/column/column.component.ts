import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Column} from "../../entity/column";
import {Entry} from "../../entity/entry";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input()
  public column: Column = new Column('', []);
  public renaming: boolean = false;
  private columnNameBeforeRename?: string;

  @Output()
  public save: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public delete: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }


  startRenameColumn() {
    this.renaming = true;
    this.columnNameBeforeRename = this.column?.name;
  }

  stopRenameColumn() {
    if (this.column?.name !== this.columnNameBeforeRename) {
      console.log('Column name changed - saving');
      this.saveColumn();
    }
    this.renaming = false;
  }

  saveColumn() {
    this.save.next(this.column);
  }

  deleteColumn() {
    this.delete.next(this.column);
  }

  addEntry() {
    this.column.entries ??= [];
    this.column.entries.push(new Entry('New Entry'));
    this.saveColumn();
  }

  deleteEntry(entryIndex: number) {
    this.column.entries.splice(entryIndex, 1);
    this.saveColumn();
  }

  drop(event: CdkDragDrop<Entry[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.save.next(this.column);
  }
}
