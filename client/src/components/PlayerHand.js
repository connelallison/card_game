import React from "react";

const PlayerHand = (props) => {
  let cardList;
  if (props.cards.length > 0) {
    cardList = props.cards.map((card) => {
      if (card.type === "minion") {
        return (
          <p>{card.name}: {card.cost} mana, {card.attack} attack, {card.health} health minion</p>
        )
      } else if (card.type === "spell") {
        return (
          <p>{card.name}: {card.cost} mana spell</p>
        )
      }
    });
  } else {
    cardList = [
      <p>No cards in hand.</p>
    ]
  }

  return(
    <div className="player-hand">
    <p>My current cards:</p>
    <div className="cardList">
      {cardList}
    </div>
    </div>
  )
}

export default PlayerHand;
