import React from "react";

const TurnTimer = (props) => {
  let activePlayer;
  if (props.mine) {
    activePlayer = "my";
  } else {
    activePlayer = "opponent's"
  }
  return(
    <div className="turn-timer">
    <p>Time remaining before end of {activePlayer} turn: {Math.max(0, props.turnEnd/1000).toFixed(2)}s.</p>
    </div>
  )
}

export default TurnTimer;
