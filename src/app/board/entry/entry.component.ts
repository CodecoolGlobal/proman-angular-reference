import {Component, Input, OnInit} from '@angular/core';
import {Entry} from "../../entity/entry";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  @Input()
  public entry?: Entry;

  constructor() {
  }

  ngOnInit(): void {
  }

}
