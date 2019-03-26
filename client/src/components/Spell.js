import React from "react";

const Spell = (props) => {
  return(
    <div className="spell card">
      <p>{props.name}</p>
      <p>{props.cost} mana Spell</p>
      <br/>
      <br/>
    </div>
  )
}

export default Spell;
