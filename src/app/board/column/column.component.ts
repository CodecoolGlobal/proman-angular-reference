import {Component, Input, OnInit} from '@angular/core';
import {Column} from "../../entity/column";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input()
  public column?: Column;

  constructor() {
  }

  ngOnInit(): void {
  }

}
