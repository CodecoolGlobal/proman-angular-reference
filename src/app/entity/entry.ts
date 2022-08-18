export class Entry {
  constructor(public content: string) {
  }

  toObject() {
    return {...this};
  }
}
