import React from 'react'

const GameStatus = (props) => {
  const activePlayer = props.mine ? 'My' : "Opponent's"
  const turnTime = Math.ceil(Math.max(0, props.turnEnd / 1000))

  // console.log(props.jobDone)

  let gameStatus
  if (props.mulligan) {
    gameStatus = <p className='lowerMargin'>Choose your opening hand: {turnTime}s remaining.</p>
  } else if (props.winner) {
    gameStatus = <p className='lowerMargin'>The game is over: {props.winner}.</p>
  } else {
    gameStatus = <p className='lowerMargin'>{activePlayer} turn: {turnTime}s remaining.</p>
  }

  const endTurn = props.mine && !props.winner ? <button className={props.jobDone ? 'jobDone' : ''} onClick={props.endTurn}>End Turn</button> : null
  return (
    <div className='game-status'>
      {gameStatus}
      {endTurn}
    </div>
  )
}

export default GameStatus
