import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Board} from "../entity/board";
import {BoardService} from "../services/board.service";
import {Entry} from "../entity/entry";
import {Column} from "../entity/column";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input()
  public board: Board = new Board('', []);
  public renaming: boolean = false;
  private boardNameBeforeRename?: string;

  constructor(private boardService: BoardService) {
  }

  ngOnInit(): void {
  }

  startRenameBoard() {
    this.renaming = true;
    this.boardNameBeforeRename = this.board.name;
  }

  stopRenameBoard(event: Event) {
    event.preventDefault();
    event.cancelBubble = true;
    if (this.board.name !== this.boardNameBeforeRename) {
      console.log('Board name changed - saving');
      this.saveBoard();
    }
    this.boardNameBeforeRename = this.board.name;
    this.renaming = false;
  }

  saveBoard() {
    this.boardService.save(this.board);
  }

  deleteColumn(columnIndex: number) {
    this.board.columns.splice(columnIndex, 1);
    this.saveBoard();
  }

  addColumn() {
    this.board.columns ??= [];
    this.board.columns.push(new Column('New Column', []));
    this.saveBoard();
  }

  deleteBoard() {
    this.boardService.delete(this.board);
  }
}
