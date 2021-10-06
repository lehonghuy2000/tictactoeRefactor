import React, {useState} from "react";
import Board from "./Components/Board";
import "./App.css"
import calculateWinner from "./helper/CheckWinner";
const App = () => {
    const [chessState, updateState]= useState({
      history: [
        {
          squares: Array(9).fill(null),
          location:{x:null, y:null}
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isOrder: false
    })
    const [chessSize, updatesize]= useState(5)
    const handleClick = (i) => {
      const history = chessState.history.slice(0, chessState.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const symbol = chessState.xIsNext ? 'O':'X';
      const location = {x: parseInt((i)%+chessSize+1), y:parseInt((i)/+chessSize+1)};
      if (calculateWinner(squares, symbol,chessSize) || squares[i]) {
        return;
      }
      squares[i] = chessState.xIsNext ? "X" : "O";
      updateState((prevState)=>{
        return{
        ...prevState,
        history: history.concat([
          {
            squares: squares,
            location: location
          }
        ]),
        stepNumber: history.length,
        xIsNext: !chessState.xIsNext}
      });
    }
  
    const jumpTo= (step) => {
      updateState((prevState) => {
        return{
          ...prevState,
          stepNumber: step,
          xIsNext: (step % 2) === 0}

      });
    }
    const modeReverse =()=>{
      updateState((prevState) => {
        return{
          ...prevState,
          isOrder: !chessState.isOrder}
      });
    }
    const PlayAgain =()=>{
      updateState({
        history: [
          {
            squares: Array(9).fill(null),
            location:{x:null, y:null}
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        isOrder: false
      })

    }

    const history = chessState.history;
    const current = history[chessState.stepNumber];
    const symbol = chessState.xIsNext ? 'O':'X';
    const winner = calculateWinner(current.squares, symbol, chessSize);
    const historyArr = chessState.history.slice();
    if(chessState.isOrder)
    {
      historyArr.reverse();
    }
    const setSize = (event) =>{
      if(parseInt(event.target.value) >= 5 && parseInt(event.target.value)<=20)
      {
        updatesize(parseInt(event.target.value));
      }
    }
    const moves = historyArr.map((step, move) => {
      let desc = move ?
      'Go to move '.concat(`(${step.location.x}: ${step.location.y})`):
        'Go to game start';
        if(move===0 && chessState.isOrder)
        {
          desc='Go to move '.concat(`(${step.location.x}: ${step.location.y})`);
        }
      if(move===historyArr.length-1 && chessState.isOrder)
      {
        desc='Go to game start';
      }
      let stepTostep = move;
      if(chessState.isOrder)
      {
        stepTostep=historyArr.length-1-move;
      }
      return (
        <li key={stepTostep}>
          <button 
          className={stepTostep===chessState.stepNumber ? "bold-item" : null}
          onClick={() => jumpTo(stepTostep)}>{desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + symbol;
    } else {
      status = "Next player: " + (chessState.xIsNext ? "X" : "O");
    }
    if(!winner && chessState.history.length===chessSize*chessSize+1)
    {
      status="Draw";
    }

    return (
      <React.Fragment>
      
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winner ={winner ? winner : null}
            size = {chessSize}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div>
          <label>Size</label>
          <input type='text' onChange={setSize} disabled={chessState.history.length>1 ?true:false}></input>
        </div>
        <div>
        <button onClick={()=>{modeReverse()}}>{!chessState.isOrder ? "Ascending" : "Descending"}</button>
        </div>
        <div>
        <button onClick={()=>{PlayAgain()}}>Play Again</button>
        </div>
      </div>
      </React.Fragment>
    );
  }

  export default App;