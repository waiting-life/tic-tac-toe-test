import React from 'react'
import './Game.css'
const { useState } = React
// Game组件
export default function Game() {
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


  const [history, setHistory] = useState([{ squares: [] }])
  const [squares, setSquares] = useState([])
  const [isXNext, setIsxnext] = useState(true)
  const [stepNumber, setStepnumber] = useState(0)
  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)
  let status
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (isXNext ? 'X' : 'O');
  }

  function handleClick(index) {
    const newSquares = [...squares]
    if (calculateWinner(newSquares) || newSquares[index]) return
    // console.log(index, isXNext)
    newSquares[index] = isXNext ? 'X' : 'O'
    setIsxnext(!isXNext)
    setSquares(newSquares)

    // 原来写成
    // setHistory(history.concat([{
    //   squares
    // }]))

    setStepnumber(history.length)
    setHistory(history.concat([{
      squares: newSquares
    }]))
  }

  function jumpTo(step) {
    setStepnumber(step)
    // 当状态 stepNumber 是偶数时，我们还要把 xIsNext 设为 true
    setIsxnext(step % 2 === 0)
  }
  const moves = history.map((_, move) => {
    // move这里
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={ move }>
        <button onClick={ () => jumpTo(move) }>{ desc }</button>
      </li>
    )
  })

  return(
    <div className="game">
      <div className="game-board">
        <Board squares={ current.squares } onHandleclick={(index) => handleClick(index)}/>
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <ol>{ moves }</ol>
      </div>
    </div>
  )
}

// function Parent() {
//   const [count, setCount] = React.useState(10)
//   function add() {
//     setCount(count + 1)
//   }
//   return (
//     <>
//       <button onClick={add}>父组件的加一</button>
//       <Child count={count} onAdd={add} />
//       <Child count={count} />
//       <Child count={count} />
//     </>
//   )
// }


// function Child(props) {
//   console.log(props)
//   const { count, name, onAdd } = props
//   return (
//     <div>计数器的值为：{count}<button onClick={onAdd}>加一</button></div>
//   )
// }

// Board组件
function Board(props) {
  function renderSquare(index) {
    const { squares, onHandleclick } = props
    return <Square value={ squares[index]} onHandleclick={ () => onHandleclick(index) }/>
  }
  return (
    <div>
      {/* <div className="status">status</div> */}
      <div className="board-row">
        { renderSquare(0) }
        { renderSquare(1) }
        { renderSquare(2) }
      </div>
      <div className="board-row">
        { renderSquare(3) }
        { renderSquare(4) }
        { renderSquare(5) }
      </div>
      <div className="board-row">
        { renderSquare(6) }
        { renderSquare(7) }
        { renderSquare(8) }
      </div>
    </div>
  )
}

// Square组件
function Square(props) {
  const { value, onHandleclick } = props 
  return(
    <button className="square" onClick={ onHandleclick }>
      { value }
    </button>
  )
}

