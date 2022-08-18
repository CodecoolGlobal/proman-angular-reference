import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Board} from "../entity/board";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Column} from "../entity/column";

export const PUBLIC_BOARD_COLLECTION_NAME: string = 'public-boards';

@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnDestroy {
  private publicBoards: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  private subscription?: Subscription;
  private collection: AngularFirestoreCollection<Board>;

  constructor(private db: AngularFirestore) {
    this.collection = db.collection<Board>(PUBLIC_BOARD_COLLECTION_NAME)
    this.init();
  }

  public getPublicBoards(): Observable<Board[]> {
    return this.publicBoards.asObservable();
  }

  public addNewBoard(): void {
    const board = new Board('New Board', [
      new Column('New', []),
      new Column('In Progress', []),
      new Column('Testing', []),
      new Column('Done', [])
    ]);
    this.db.collection(PUBLIC_BOARD_COLLECTION_NAME).add(board.toObject())
      .then(boardReference => console.log('New Board added successfully', boardReference))
      .catch(error => console.error('Error creating new Board', error));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private init() {
    this.subscription = this.collection
      .valueChanges()
      .subscribe(boards => this.publicBoards.next(boards));
  }
}
