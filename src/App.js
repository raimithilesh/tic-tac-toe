import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import Square from './components/Square';
import { Patterns } from './components/Patterns';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [board, setBoard] = useState(["","","","","","","","",""]);
  const[player, setPlayer] = useState("O");
  const[result, setResult] = useState({winnner:"none", state:"none"});
  
  useEffect(() => {
    checkWin();
    checkIfTie();

    if(player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X")
    }
  }, [board])

  useEffect(() => {
    if(result.state !== "none") {
      alert(`Game Finished! Winning Player:${result.winnner}`);
    }
   
  }, [result])

  const chooseSquare = (square) => {
    setBoard(board.map((val, idx) => {
      if(idx === square && val === "") {
          return player
      }
      return val;
    }));
  }

  const resetPlayers = ()=> {
    setBoard(board.map((val, idx) => {     
      return "";
    }));
  }

  const checkWin =() => {
    Patterns.forEach((currPattern)=>{
      const firstPlayer = board[currPattern[0]];
      let foundWinningPattern = true;
      if(firstPlayer === "") return;
      currPattern.forEach((idx) =>{
        if(board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if(foundWinningPattern) {
          setResult({winnner:player, state:"won"})
      }
    })
  }

  const checkIfTie = () => {
    let field = true;
    board.forEach((square)=>{
      if(square === "") {
        field = false;
      }
    })

    if(field) {
     setResult({winnner:"No One", state:"Tie"})
    }
  }
  return (
    <div className="App">
     <button onClick={resetPlayers} type="button" class="btn btn-primary fixed-top">Reset</button>
     <div  className="board">
      <div className="row">
        <Square val={board[0]} chooseSquare={()=>chooseSquare(0)}/>
        <Square val={board[1]} chooseSquare={()=>chooseSquare(1)}/>
        <Square val={board[2]} chooseSquare={()=>chooseSquare(2)}/>
      </div>
      <div className="row">
        <Square val={board[3]} chooseSquare={()=>chooseSquare(3)}/>
        <Square val={board[4]} chooseSquare={()=>chooseSquare(4)}/>
        <Square val={board[5]} chooseSquare={()=>chooseSquare(5)}/>
        </div>
      <div className="row">
        <Square val={board[6]} chooseSquare={()=>chooseSquare(6)}/>
        <Square val={board[7]} chooseSquare={()=>chooseSquare(7)}/>
        <Square val={board[8]} chooseSquare={()=>chooseSquare(8)}/>
        </div>
     </div>
    </div>
  );
}

export default App;
