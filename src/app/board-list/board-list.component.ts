import {Component, OnInit} from '@angular/core';
import {BoardService} from "../services/board.service";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {

  constructor(public boardService: BoardService) {
  }

  ngOnInit(): void {
  }

  public addNewBoard() {
    this.boardService.addNewBoard();
  }
}
