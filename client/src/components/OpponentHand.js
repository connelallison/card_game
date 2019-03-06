import React from "react";

const OpponentHand = (props) => {
  return(
    <div className="opponent-hand">
      <p>Opponent's current cards: {props.cardNumber}</p>
    </div>
  )
}

export default OpponentHand;
