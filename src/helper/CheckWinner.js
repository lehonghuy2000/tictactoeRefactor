
const MAX_WIN =5;

function CheckRows(squares, symbol, chessSize)
{
  let listwin=[];
  for(let i=0;i<chessSize*chessSize;i+=+chessSize)
  {
    for(let j=0;j<chessSize;j++)
    {
      if(squares[i+j]===symbol)
      {
        listwin.push(i+j);
      }
      else{
        if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
        listwin=[];
      }
    }
    if(listwin.length>=MAX_WIN)
    {
      return listwin;
    }
  }
  return null;
}
function CheckCols(squares, symbol, chessSize)
{
  let listwin=[];
  for(let i=0;i<chessSize;i++)
  {
    for(let j=0;j<chessSize*chessSize;j+=+chessSize)
    {
      if(squares[i+j]===symbol)
      {
        listwin.push(i+j);
      }
      else{
        if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
        listwin=[];
      }
    }
    if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
  }
  return null;
}
function CheckMainDiagonal(squares, symbol, chessSize)
{
  let listwin=[];
  for(let i=0;i<chessSize-MAX_WIN+1;i++)
  {
    let k=0;
    for(let j=0+i*chessSize;j<chessSize*chessSize;j+=+chessSize)
    {
      if(k+j<chessSize*chessSize){
        if(squares[k+j]===symbol)
        {
          listwin.push(k+j);
        }
        else{
          if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
          listwin=[];
        }
      }
      else{
        break;
      }
      k++;
    }
    if(listwin.length>=MAX_WIN)
    {
      return listwin;
    }
  }
  listwin=[];
  for(let i=1;i<chessSize-MAX_WIN+1;i++)
  {
    let k=0;
    for(let j=0+i;j<chessSize;j++)
    {
      if(k+j<chessSize*chessSize){
          if(squares[k+j]===symbol)
        {
          listwin.push(k+j);
        }
        else{
          if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
          listwin=[];
        }
      }
      else{
        break;
      }
      k+=+chessSize;
    }
    if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
  }
  return null;
} 

function CheckDiagonal(squares, symbol, chessSize)
{
  let listwin=[];
  for(let i=0;i<chessSize-MAX_WIN+1;i++)
  {
    let k=1;
    for(let j=0+(i+1)*chessSize;j<=chessSize*chessSize;j+=+chessSize)
    {
      if(j-k<chessSize*chessSize){
          if(squares[j-k]===symbol)
        {
          listwin.push(j-k);
        }
        else{
          if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
          listwin=[];
        }
      }
      else{
        break;
      }
      k++;
    }
    if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
  }
  listwin=[];
  for(let i=0;i<chessSize-MAX_WIN;i++)
  {
    let k=chessSize;
    for(let j=0+i+1;j<chessSize;j++)
    {
      if(k-j-1<chessSize*chessSize){
          if(squares[k-j-1]===symbol)
        {
          listwin.push(k-j-1);
        }
        else{
          if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
          listwin=[];
        }
      }
      else{
        console.log(1)
        break;
      }
      k+=+chessSize;
    }
    if(listwin.length>=MAX_WIN)
          {
            return listwin;
          }
  }
  return null;
} 
function calculateWinner(squares, symbol, chessSize) {
  const isColsWin = CheckCols(squares,symbol, chessSize);
  if(isColsWin)
  {
    return isColsWin;
  }
  const isRowsWin = CheckRows(squares,symbol, chessSize);
  if(isRowsWin)
  {
    return isRowsWin;
  }
  const isMainDiagonalWin = CheckMainDiagonal(squares,symbol, chessSize);
  if(isMainDiagonalWin)
  {
    return isMainDiagonalWin;
  }
  const isDiagonalWin = CheckDiagonal(squares,symbol, chessSize);
  if(isDiagonalWin)
  {
    return isDiagonalWin;
  }
  return null;
}
export default calculateWinner;