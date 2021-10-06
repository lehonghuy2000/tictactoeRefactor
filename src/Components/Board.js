import React from "react";
import Square from "./Square"
const Board = (props) => {
    console.log(props.winner)
    const renderSquare = (i) => {
      if(props.winner)
      {return (
        <Square
          value={props.squares[i]}
          winner ={(props.winner.includes(i)) ? true : null}
          onClick={() => props.onClick(i)}
        />
      );}
      else
      {
        return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
        />);
      }
    }
    let square;
    let board=[];
    for(let i=0;i<Math.pow(props.size,2);i+=+props.size)
    {
      square=[];
      for(let j=0;j<props.size;j++)
      {
        square.push(renderSquare(i+j));
      }
      board.push(
        <div key={i} className="board-row">
					{square}
				</div>
      )
    }
    return (
      <div>
        {board}
      </div>
    );
  }
  export default Board;