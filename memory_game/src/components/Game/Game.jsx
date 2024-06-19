import { useState, useEffect, useRef } from "react";
import { Board, generateBoard } from "../Board/Board";
import { Player } from "../Player/Player";
import './Game.css'


export const Game = ({ boardSize }) => {
  const [numPlayers] = useState(Math.floor(Math.random() * 3) + 2);
  const [board, setBoard] = useState(generateBoard(boardSize));
  const [players] = useState(Array.from({ length: numPlayers }, (_, i) => new Player(i)));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isHunting, setIsHunting] = useState(false);
  const [message, setMessage] = useState("");
  const timeoutRef = useRef(null);
  const [findings, setFindings] = useState(Array.from({ length: numPlayers }, () => []));

  useEffect(() => {
    if (!isHunting) return;

    const player = players[currentPlayerIndex];
    const [first, second] = player.makeMove(board);

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[first] = { ...newBoard[first], revealed: true };
      newBoard[second] = { ...newBoard[second], revealed: true };
      return newBoard;
    });

    timeoutRef.current = setTimeout(() => {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        const firstElement = newBoard[first] ? newBoard[first].element : undefined;
        const secondElement = newBoard[second] ? newBoard[second].element : undefined;

        if (firstElement === undefined || secondElement === undefined) {
          setMessage("Board solved");
          return newBoard;
        }
        if (firstElement === secondElement) {
          newBoard[first] = { ...newBoard[first], matched: true };
          newBoard[second] = { ...newBoard[second], matched: true };
          const updatedFindings = [...findings];
          updatedFindings[currentPlayerIndex] = updatedFindings[currentPlayerIndex].concat({firstElement, secondElement, pair: true});
          setFindings(updatedFindings);
          console.log(findings)
        } else {
          newBoard[first] = { ...newBoard[first], revealed: false };
          newBoard[second] = { ...newBoard[second], revealed: false };
          const updatedFindings = [...findings];
          updatedFindings[currentPlayerIndex] = updatedFindings[currentPlayerIndex].concat({firstElement, secondElement, pair: false});
          setFindings(updatedFindings);
        }

        return newBoard;
      });

      player.remember(first, board[first].element);
      player.remember(second, board[second].element);
      setCurrentPlayerIndex((prev) => (prev + 1) % numPlayers);
    }, 2000);

    return () => clearTimeout(timeoutRef.current);
  }, [isHunting, currentPlayerIndex]);

  const startHunt = () => {
    setBoard(generateBoard(boardSize));
    setFindings(Array.from({ length: numPlayers }, () => []));
    setIsHunting(true);
  };

  return (
    <div>
      <button onClick={startHunt} disabled={isHunting}>
        Start Memory Game
      </button>
      <div style={{ display: "flex", flexDirection: "row", gap: "100px" }}>
        <div>
          {message ? <h3>{message}</h3> : <h3>Player {currentPlayerIndex + 1}'s turn</h3>}
          <Board
            board={board.map((cell, index) => ({
              ...cell,
              revealed:
                cell.revealed ||
                (cell.matched && findings.some((playerFindings) => playerFindings.includes(cell.element))),
            }))}
          />
        </div>
        <div>
          <h3>Players' findings:</h3>
          <table style={{width: '500px'}}>
          <thead>
            <tr>
            {findings.map((playerFindings, playerIndex) => (
            <th key={playerIndex}>

              <h4>Player {playerIndex + 1}</h4></th>
            ))}
            </tr>
          </thead>
          <tbody>
          <tr>

          {findings.map((playerFindings, playerIndex) => (
            <td key={playerIndex}>

    
                {playerFindings.map((element, idx) => (
                  <tr key={idx}><td style={{color: element.pair ?'red' : 'greeen'}}>{`[${element.firstElement}, ${element.secondElement}]`}</td></tr>
                ))}
              
            </td>
          ))}
          </tr>
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
