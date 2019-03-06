import React from "react";

const Spell = (props) => {
  return(
    <div className="spell card">
      <p>{props.name}</p>
      <p>{props.cost} mana Spell</p>
    </div>
  )
}

export default Spell;
