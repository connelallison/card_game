import React from 'react'

const Minion = (props) => {
  if (props.canAttack) {
    return (
      <div className='canAttack minion card'>
        <p>{props.name}</p>
        <p>{props.cost} mana Minion</p>
        <p>{props.attack} attack</p>
        <p>{props.health} health</p>
      </div>
    )
  } else if (props.canBePlayed) {
    return (
      <div className='canBePlayed minion card'>
        <p>{props.name}</p>
        <p>{props.cost} mana Minion</p>
        <p>{props.attack} attack</p>
        <p>{props.health} health</p>
      </div>
    )
  } else {
    return (
      <div className='minion card'>
        <p>{props.name}</p>
        <p>{props.cost} mana Minion</p>
        <p>{props.attack} attack</p>
        <p>{props.health} health</p>
      </div>
    )
  }
}

export default Minion
