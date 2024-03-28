

function Scoreboard({ score, onClose }) {
    
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
        <p>Your Score: {score}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Scoreboard;
