import TicTacToe from "./tic_tac_toe/Tictactoe.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header/Description */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Coding Journey</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
        This is where I experiment and build daily. Some projects are polished, others are works in progress, but each one helps me grow. Built with passion and React. 
        </p>
      </div>

      {/* Tic-Tac-Toe Container */}
      <div className="max-w-lg mx-auto border-2 border-gray-200 rounded-xl p-6 shadow-md bg-white">
        <TicTacToe />
      </div>

      {/* Optional Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        Made with Vite + React + Tailwind
      </div>
    </div>
  );
}