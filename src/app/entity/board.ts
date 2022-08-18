import {Column} from "./column";

export class Board {
  constructor(public name: string, public columns: Column[]) {
  }

  public toObject() {
    return {name: this.name, columns: this.columns.map(c => c.toObject())};
  }
}
