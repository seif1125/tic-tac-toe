import './App.css';
import Square from './Square';
import { useState, useRef, useEffect } from 'react';
import Status from './Status';
import History from './History';

export default function Board() {
  const [boardArray, setBoardArray] = useState([null, null, null, null, null, null, null, null, null]);
  const [status, setStatus] = useState('playerOne Turn');
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);
  const [history, setHistory] = useState([]);
  const statusRef = useRef(null);

  function handleSquareClick(index) {
    setBoardArray((prevBoardArray) => {
      if (prevBoardArray[index] || isGameWinner(prevBoardArray)) return prevBoardArray; // Ignore if square is taken or game is already won

      const newSquareArray = [...prevBoardArray];
      newSquareArray[index] = isFirstPlayer ? 'X' : 'O';

      if (isGameWinner(newSquareArray)) {
        setStatus(isFirstPlayer ? 'playerOne wins' : 'playerTwo wins');
      } else {
        setStatus(isFirstPlayer ? 'playerTwo Turn' : 'playerOne Turn');
        setIsFirstPlayer(!isFirstPlayer);
      }

      setHistory([...history, newSquareArray]);
      return newSquareArray;
    });
  }

  function isGameWinner(board) {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  function goToMove(index) {
    setBoardArray(() => {
      const newSquareArray = history[index];
      const xCount = newSquareArray.filter(square => square === 'X').length;
      const oCount = newSquareArray.filter(square => square === 'O').length;

      setStatus(
        xCount > oCount ? 'playerTwo Turn' : 'playerOne Turn'
      );
      setIsFirstPlayer(xCount <= oCount);

      const newHistoryArray = history.slice(0, index + 1);
      setHistory(newHistoryArray);

      return newSquareArray;
    });
  }
  function resetGame(){
    
      setBoardArray([null, null, null, null, null, null, null, null, null]);
      setStatus('playerOne Turn');
      setIsFirstPlayer(true);
      setHistory([]);
    
  }

  useEffect(() => { 
    let timer;
    if (status === 'playerOne wins' || status === 'playerTwo wins') {
      if (statusRef.current) {
        statusRef.current.classList.add('blink');
       timer = setTimeout(() => {
          statusRef.current.classList.remove('blink');
        }, 3000);
        // Stop blinking after 3 seconds
        return () => clearTimeout(timer); // Cleanup timer
      }
    }
    else{
      if(statusRef.current.classList.contains('blink')){
      statusRef.current.classList.remove('blink');
      return () => clearTimeout(timer); 
    }
    }
  }, [status]);

  return (
    <>
      <div className='board-container'>
        <Status ref={statusRef} status={status} />
        <div className='board-game'>
          <div className='square-row'>
            <Square onSquareClick={() => handleSquareClick(0)} value={boardArray[0]} />
            <Square onSquareClick={() => handleSquareClick(1)} value={boardArray[1]} />
            <Square onSquareClick={() => handleSquareClick(2)} value={boardArray[2]} />
          </div>
          <div className='square-row'>
            <Square onSquareClick={() => handleSquareClick(3)} value={boardArray[3]} />
            <Square onSquareClick={() => handleSquareClick(4)} value={boardArray[4]} />
            <Square onSquareClick={() => handleSquareClick(5)} value={boardArray[5]} />
          </div>
          <div className='square-row'>
            <Square onSquareClick={() => handleSquareClick(6)} value={boardArray[6]} />
            <Square onSquareClick={() => handleSquareClick(7)} value={boardArray[7]} />
            <Square onSquareClick={() => handleSquareClick(8)} value={boardArray[8]} />
          </div>
        </div>
      </div>
      <History reset={resetGame} goToMove={goToMove} history={history} />
    </>
  );
}
