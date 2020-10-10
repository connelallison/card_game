import React from 'react'

const GameStatus = (props) => {
  const activePlayer = props.mine ? 'My' : "Opponent's"
  const turnTime = Math.ceil(Math.max(0, props.turnEnd / 1000))

  let gameStatus
  if (!props.started) {
    gameStatus = <p className='lowerMargin'>The game has not started yet.</p>
  } else if (props.winner) {
    gameStatus = <p className='lowerMargin'>The game is over: {props.winner}.</p>
  } else {
    gameStatus = <p className='lowerMargin'>{activePlayer} turn: {turnTime}s remaining.</p>
  }

  const endTurn = props.mine ? <button onClick={props.endTurn}>End Turn</button> : null
  return (
    <div className='game-status'>
      {gameStatus}
      {endTurn}
    </div>
  )
}

export default GameStatus
