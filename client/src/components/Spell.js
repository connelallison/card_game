import React from "react";

const Spell = (props) => {
  if (props.canBePlayed) {
    return(
      <div className="canBePlayed spell card">
        <p>{props.name}</p>
        <p>{props.cost} mana Spell</p>
        <br/>
        <br/>
      </div>
    )
  } else {
    return(
      <div className="spell card">
        <p>{props.name}</p>
        <p>{props.cost} mana Spell</p>
        <br/>
        <br/>
      </div>
    )
  }
}

export default Spell;
