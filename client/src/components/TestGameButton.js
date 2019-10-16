import React from 'react'

const TestGameButton = (props) => {
  return (
    <button id='request-test-game' onClick={props.onRequested}>Request Test Game</button>
  )
}

export default TestGameButton
