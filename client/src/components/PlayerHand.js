import React from 'react'
import Follower from './Follower'
import Moment from './Moment'
import Unknown from './Unknown'
import Creation from './Creation'
import Passive from './Passive'

const PlayerHand = (props) => {
  let cardList
  if (props.cards.length > 0) {
    cardList = props.cards.map((card) => {
      if (card.type === 'unknown') {
        return (<Unknown />)
      } else if (card.type === 'Follower') {
        return (
          <Follower object={card} targetSelection={props.targetSelection} handleSelection={props.handleSelection} />
        )
      } else if (card.type === 'Moment') {
        return (
          <Moment object={card} targetSelection={props.targetSelection} handleSelection={props.handleSelection} />
        )
      } else if (card.type === 'Creation') {
        return (
          <Creation object={card} targetSelection={props.targetSelection} handleSelection={props.handleSelection} />
        )
      } else if (card.type === 'Passive') {
        return  (
          <Passive object={card} targetSelection={props.targetSelection} handleSelection={props.handleSelection} />
        )
      } else {
        return new Error('card is not a follower, moment, or creation')
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
    <div className='player-hand'>
      {/* <p className='lowerMargin'>My current cards:</p> */}
      <div className='cardList playerHand'>
        {cardList}
      </div>
    </div>
  )
}

export default PlayerHand
