import React from 'react'

const GameStatus = (props) => {
  const activePlayer = props.mine ? 'My' : "Opponent's"
  const turnTime = Math.max(0, props.turnEnd / 1000).toFixed(1)

  let gameStatus
  if (!props.started) {
    gameStatus = <p className='lowerMargin'>The game has not started yet.</p>
  } else if (props.winner) {
    gameStatus = <p className='lowerMargin'>The game is over: {props.winner}.</p>
  } else {
    gameStatus = <p className='lowerMargin'>{activePlayer} turn: {turnTime}s remaining.</p>
  }
  return (
    <div className='game-status'>
      {gameStatus}
    </div>
  )
}

export default GameStatus
