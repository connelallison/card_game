import React from "react";
import Minion from "./Minion.js";
import Spell from "./Spell.js";
import Unknown from "./Unknown.js";

const PlayerHand = (props) => {
  let cardList;
  if (props.cards.length > 0) {
    cardList = props.cards.map((card) => {
      if (card.type === "unknown") {
        return ( <Unknown/>);
      } else if (card.type === "minion") {
        return (
          <Minion name={card.name} cost={card.cost} attack={card.attack} health={card.health}/>
        );
      } else if (card.type === "spell") {
        return (
          <Spell name={card.name} cost={card.cost}/>
        );
      } else {
        return new Error("card is neither a minion nor a spell");
      }
    });
  } else {
    cardList = [
      <p>No cards in hand.</p>,
      <br/>,
      <br/>,
      <br/>,
      <br/>
    ]
  }

  return(
    <div className="player-hand">
    <p className="lowerMargin">My current cards:</p>
    <div className="cardList">
      {cardList}
    </div>
    </div>
  )
}

export default PlayerHand;
