import { useState } from "react";

function GameBoard({ squares, xIsNext, playedMovesNumber, onPlay }) {
  const winner = playedMovesNumber >= 5 ? calculateWinner(squares) : null;
  
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (playedMovesNumber === 9) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? "x" : "o"}`;
  }

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "x" : "o";
    onPlay(newSquares);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-lavender-100 p-4 sm:p-6 rounded-2xl shadow-lg">
      <div className={`text-center text-2xl sm:text-3xl font-bold mb-4 ${
        winner ? "text-purple-600 animate-pulse" : "text-purple-700"
      }`}>
        {status}
      </div>
      <div className="space-y-2">
        {[0, 3, 6].map((row) => (
          <div key={row} className="flex space-x-2">
            {[0, 1, 2].map((col) => (
              <Square
                key={row + col}
                value={squares[row + col]}
                onSquareClick={() => handleClick(row + col)}
                winner={winner}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Square({ value, onSquareClick, winner }) {
  return (
    <button
      className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center
        text-4xl sm:text-5xl font-bold rounded-lg border-2
        transition-all duration-200 active:scale-95
        ${
          !value && !winner
            ? "border-purple-200 hover:bg-purple-50"
            : value === "x"
            ? "border-pink-300 bg-pink-50 text-pink-500"
            : "border-indigo-300 bg-indigo-50 text-indigo-500"
        }
        ${winner ? "cursor-default" : "cursor-pointer"}`}
      onClick={onSquareClick}
      disabled={!!winner}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToe() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((_, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className={`w-full px-3 py-2 text-sm sm:text-base rounded-lg transition-colors ${
            move === currentMove
              ? "bg-purple-600 text-white"
              : "bg-purple-100 text-purple-800 hover:bg-purple-200"
          }`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-lavender-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-purple-900">
          Tic Tac Toe
        </h1>
        <div className="flex flex-col gap-6 items-center">
          <GameBoard
            squares={currentSquares}
            xIsNext={xIsNext}
            playedMovesNumber={currentMove}
            onPlay={handlePlay}
          />
          <div className="w-full max-w-xs bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-purple-800 mb-3">
              Game History
            </h2>
            <ol className="space-y-2">{moves}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}