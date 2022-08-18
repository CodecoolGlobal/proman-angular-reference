import {Entry} from "./entry";

export class Column {
  constructor(public name: string, public entries: Entry[]) {
  }

  toObject() {
    return {name: this.name, entries: this.entries.map(e => e.toObject())};
  }
}
