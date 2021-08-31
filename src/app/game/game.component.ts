import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart();
    const currentTurn = 'Current turn: Player ' + this.game.currentPlayer;
    const information = document.querySelector('.current-status');
    information!.innerHTML = currentTurn;
  }

  clickSubfield( subfield: any )//: Promise<void>
  {
    if(this.game.gameStatus === 1 )
    {
      const position = subfield.currentTarget.getAttribute('position');
      const information = document.querySelector('.current-status');
      this.game.setField(position, this.game.currentPlayer);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

       this.game.checkWinner().then( (end: boolean) => {
        if (this.game.gameStatus === 0 && end){
          if(this.game.currentPlayer === 1)
          {
            information!.innerHTML = 'The winner is Player: 2';
          } else {
            information!.innerHTML = 'The winner is Player: 1';
          }
          
        }
      });

      this.game.gameFinished().then( (end: boolean) => {
        if (this.game.gameStatus === 0 && end){
          information!.innerHTML = 'DRAW'; 
        }
      });

      this.game.changePlayer();

      if(this.game.gameStatus === 1){
        const currentTurn = 'Current turn: Player ' + this.game.currentPlayer;
        information!.innerHTML = currentTurn;
      }
    }
  }
}