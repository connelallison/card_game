import React from "react";

const Minion = (props) => {
  return(
    <div className="minion card">
      <p>{props.name}</p>
      <p>{props.cost} mana Minion</p>
      <p>{props.attack} attack</p>
      <p>{props.health} health</p>
    </div>
  )
}

export default Minion;
