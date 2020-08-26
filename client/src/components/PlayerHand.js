import React from 'react'
import Follower from './Follower.js'
import Moment from './Moment.js'
import Unknown from './Unknown.js'
import Creation from './Creation.js'
import Passive from './Passive.js'

const PlayerHand = (props) => {
  let cardList
  if (props.cards.length > 0) {
    cardList = props.cards.map((card) => {
      if (card.type === 'unknown') {
        return (<Unknown />)
      } else if (card.type === 'Follower') {
        return (
          <Follower object={card} selected={props.selected} interactivity={props.interactivity} />
        )
      } else if (card.type === 'Moment') {
        return (
          <Moment object={card} selected={props.selected} interactivity={props.interactivity} />
        )
      } else if (card.type === 'Creation') {
        return (
          <Creation object={card} selected={props.selected} interactivity={props.interactivity} />
        )
      } else if (card.type === 'Passive') {
        return  (
          <Passive object={card} selected={props.selected} interactivity={props.interactivity} />
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
