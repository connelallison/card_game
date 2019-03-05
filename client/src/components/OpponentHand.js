import React from "react";

const OpponentHand = (props) => {
  return(
    <div>
      <p>Opponent Hand will go here</p>
      <p>Opponent's current cards: {props.cardNumber}</p>
    </div>
  )
}

export default OpponentHand;
