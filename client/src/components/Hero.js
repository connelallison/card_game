import React from "react";

const Hero = (props) => {
  let isMyHero;
  if (props.mine) {
    isMyHero = "This is my hero."
  } else {
    isMyHero = "This is the enemy hero."
  }

  return(
    <div className="hero">
      <p>{isMyHero}</p>
      <p>Hero's attack: {props.attack}</p>
      <p>Hero's health: {props.health}</p>
      <p>Hero's current mana: {props.currentMana}</p>
      <p>Hero's max mana: {props.maxMana}</p>
    </div>
  )
}

export default Hero;
