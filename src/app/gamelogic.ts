import { Status  } from "./gamestatus";
export class Gamelogic {

    gameField: Array<number> = [];

    currentPlayer!: number;

    gameStatus!: Status;

    player1wins: Array<Array<number>> = [
        [1,1,1,0,0,0,0,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,1,1,1],
        [1,0,0,1,0,0,1,0,0],
        [0,1,0,0,1,0,0,1,0],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,0,0,1],
        [0,0,1,0,1,0,1,0,0],
    ];

    player2wins: Array<Array<number>> = [
        [2,2,2,0,0,0,0,0,0],
        [0,0,0,2,2,2,0,0,0],
        [0,0,0,0,0,0,2,2,2],
        [2,0,0,2,0,0,2,0,0],
        [0,2,0,0,2,0,0,2,0],
        [0,0,2,0,0,2,0,0,2],
        [2,0,0,0,2,0,0,0,2],
        [0,0,2,0,2,0,2,0,0],
    ];

    public constructor ()
    {
        this.gameStatus = Status.STOP;
        this.gameField = [0,0,0,0,0,0,0,0,0];
    }

    gameStart(): void //Expects nothing to be returned
    {
        this.gameField = [0,0,0,0,0,0,0,0,0];
        this.currentPlayer = this.randomPlayerStart();
        console.log(this.currentPlayer);
        this.gameStatus = Status.START;
    }

    randomPlayerStart(): number //Expects a number to be returned
    {
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;
    }

    setField(position: number, value: number): void
    {
        this.gameField[position] = value;
    }

    getPlayerColorClass(): string
    {
        const colorClass = (this.currentPlayer === 2) ? 'player-two' : 'player-one';
        return colorClass;
    }



    arrayEquals(a: Array<any>, b: Array<any>): boolean {
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length 
        && a.every( (value, index) => value === b[index]);
    }

    async checkWinner(): Promise<boolean>
    {
        console.log(this.currentPlayer);
        let isWinner = false;

        const checkarray = ( this.currentPlayer === 1 ) ? this.player1wins : this.player2wins;

        const currentarray: any[] = [];

        this.gameField.forEach( (subfield, index) => {
            if (subfield !== this.currentPlayer ) {
                currentarray [index] = 0;
            } else {
                currentarray[index] = subfield;
            }
        });

        

    checkarray.forEach( (checkfield, checkIndex ) => {
        if (this.arrayEquals(checkfield, currentarray))
        {
            isWinner = true;
        }
    });

        if(isWinner)
        {
            console.log("GAME SET!");
            this.endGame();
            return true;
        } else {
            return false;
        }
    }

    changePlayer(): void
    {
        this.currentPlayer = (this.currentPlayer === 2) ? 1 : 2;
    } //checkWinner

    async gameFinished(): Promise<boolean>
    {
        let isFull = true;

        if(this.gameField.includes(0)) {
            isFull = false;
        }

        if(isFull)
        {
            console.log("GAME!");
            this.endGame();
            return true;
        } else {
            return false;
        }
    }

    endGame(): void
    {
        this.gameStatus = Status.STOP;
    }
}
