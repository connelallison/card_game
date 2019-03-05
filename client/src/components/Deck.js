import React from "react";

const Deck = (props) => {
  let owner;
  if (props.mine) {
    owner = "My";
  } else {
    owner = "Opponent's";
  }
  return(
    <div>
      <p>{owner} Deck will go here</p>
      <p>{owner} deck contains: {props.cardNumber} cards</p>
    </div>
  )
}

export default Deck;
