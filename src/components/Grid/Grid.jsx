import { useState } from "react";
import Card from "../Card/Card";
import isWinner from "../../helpers/checkWinner"
import './Grid.css'
function Grid({numberofcards}){
    const [board,setBoard] = useState(Array(numberofcards).fill(""));
    const [turn,setTurn] = useState(true);
     //if true , then turn is O , or the turn is false 
     const [winner , setWinner]=useState(null);
    function play(index){
        if(turn == true){
            board[index]="O";
        }else{
            board[index]="X";
        }
        const win = isWinner(board,turn ? "O" : "X");
        if(win){
            setWinner(win);
        }
        setBoard([... board]);
        setTurn(!turn);
    } 
    function reset(){
        setTurn(true);
        setWinner(null);
        setBoard(Array(numberofcards).fill(""));
    }
    function isDraw(board) {
        return board.every(cell => cell !== "");
    }
    return (
        <div className="grid-wrapper">
        {
            (winner || isDraw(board)) && (
                <>
                    {winner ? (
                        <h1 className="turn-highlight">Winner is {winner}</h1>
                    ) : (
                        <h1 className="turn-highlight">It's a Draw!</h1>
                    )}
                    <button className="reset" onClick={reset}> Reset Game </button>
                </>
            )
        }
        {
            !winner && !isDraw(board) && (
                <h1 className="turn-highlight">Current turn : {turn ? 'O' : 'X'}</h1>
            )
        }
        <div className="Grid">
            {board.map((el, idx) => (
                <Card gameEnd={winner || isDraw(board)} key={idx} onPlay={play} player={el} index={idx} />
            ))}
        </div>
    </div>
    );
}
export default Grid;