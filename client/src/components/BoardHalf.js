import React from "react";
import Minion from "./Minion.js"

const BoardHalf = (props) => {
  let minionList;
  if (props.minions.length > 0) {
    minionList = props.minions.map((minion) => {
        return (
          <Minion name={minion.name} cost={minion.cost} attack={minion.attack} health={minion.health}/>
        );
    });
  } else {
    minionList = [
      <p>No minions on board.</p>,
      <br/>,
      <br/>,
      <br/>,
      <br/>
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
      <p className="lowerMargin">{owner} current minions:</p>
      <div className="cardList">
        {minionList}
      </div>
    </div>
  )
}

export default BoardHalf;
