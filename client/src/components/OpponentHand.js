import React from 'react'
import Follower from './Follower.js'
import Moment from './Moment.js'
import Unknown from './Unknown.js'

const OpponentHand = (props) => {
  let cardList
  if (props.cards.length > 0) {
    cardList = props.cards.map((card) => {
      if (card.type === 'unknown') {
        return (<Unknown />)
      } else if (card.type === 'Follower') {
        return (
          <Follower name={card.name} cost={card.cost} attack={card.attack} health={card.health} />
        )
      } else if (card.type === 'Moment') {
        return (
          <Moment name={card.name} cost={card.cost} />
        )
      } else {
        return new Error('card is neither a follower nor a moment')
      }
    })
  } else {
    cardList = [
      <p>No cards in hand.</p>,
      <br />,
      <br />,
      <br />,
      <br />
    ]
  }

  return (
    <div className='opponent-hand'>
      {/* <p className='lowerMargin'>Opponent's current cards:</p> */}
      <div className='cardList'>
        {cardList}
      </div>
    </div>
  )
}

export default OpponentHand
