import React from "react";

const BoardHalf = (props) => {
  let minionList;
  if (props.minions.length > 0) {
    minionList = props.minions.map((minion) => {
        return (
          <p>{minion.name}: {minion.cost} mana, {minion.attack} attack, {minion.health} health minion</p>
        );
    });
  } else {
    minionList = [
      <p>No minions on board.</p>
    ]
  }

  let owner;
  if (props.mine) {
    owner = "My";
  } else {
    owner = "Opponent's";
  }

  return(
    <div className="boardhalf">
      <p>{owner} current minions:</p>
      <div className="cardList">
        {minionList}
      </div>
    </div>
  )
}

export default BoardHalf;
