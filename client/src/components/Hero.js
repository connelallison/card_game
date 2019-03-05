import React from "react";

const Hero = (props) => {
  let isMyHero;
  if (props.mine) {
    isMyHero = "This is my hero."
  } else {
    isMyHero = "This is the enemy hero."
  }

  return(
    <div>
      <p>{isMyHero}</p>
      <p>Hero will go here</p>
      <p>Hero's attack: {props.attack}</p>
      <p>Hero's health: {props.health}</p>
      <p>Hero's mana: {props.mana}</p>
    </div>
  )
}

export default Hero;
