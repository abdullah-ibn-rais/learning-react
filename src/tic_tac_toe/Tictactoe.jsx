import { useState } from "react"



function GameBoard({ squares, xIsNext, playedMovesNumber, onPlay }) {


    let winner = null;
    if (playedMovesNumber >= 5) winner = calculateWinner(squares);

    let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "\"x\"" : "\"o\""}`;

    if (playedMovesNumber === 9 && !winner) {
        status = "It's a draw!";
    }

    let handleClick = (i) => {
        if (squares[i] || winner) {
            return;
        }

        const newSquares = squares.slice();
        xIsNext ? newSquares[i] = "x" : newSquares[i] = "o";
        onPlay(newSquares);
    }

    return (
        <>
            <div className="text-center text-4xl font-bold mb-4">{status}</div>
            <div className="flex">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="flex">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="flex">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    )
}

function Square({ value, onSquareClick }) {

    return (
        <button
            className="w-20 h-20 text-center bg-white border border-gray-300 rounded-lg text-6xl font-bold text-gray-800 pb-5 m-1"
            onClick={onSquareClick}>
            {value}
        </button>
    )
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // Return the winner ('X' or 'O')
        }
    }
    return null; // Return null if there's no winner
}





export default function TicTacToe() {


    const [history, setHistory] = useState([Array(9).fill(null)])
    const [xIsNext, setXIsNext] = useState(true);
    const [currentMove, setCurrentMove] = useState(0);

    const playedMovesNumber = currentMove;

    const currentSquares = history[currentMove];


    function handlePlay(nextSquares) {
        setXIsNext(!xIsNext);

        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0); 
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = `Go to the move # ${move}`;
        } else {
            description = `Go to start the game`;
        }

        return (
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{description}</button>
            </li>
        )
    })



    return (
        <>
            <div className="flex flex-col mx-auto items-center gap-5 sm:flex-row sm:gap-7">
                <div>
                    <GameBoard
                        squares={currentSquares}
                        xIsNext={xIsNext}
                        playedMovesNumber={playedMovesNumber}
                        onPlay={handlePlay}
                    />
                </div>
                <div>
                    <ol>{moves}</ol>
                </div></div>

        </>
    )
}






