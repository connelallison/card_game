import React from 'react'
import Follower from './Follower'
import Moment from './Moment'
import Unknown from './Unknown'
import Creation from './Creation'
import Passive from './Passive'
import { EntityContainerProps } from './EntityContainer'

const PlayerHand = (props: EntityContainerProps) => {
  let cardList
  if (props.contents.length > 0) {
    cardList = props.contents.map((card) => {
      if (card.type === 'unknown') {
        return (<Unknown />)
      } else if (card.type === 'Follower') {
        return (
          <Follower object={card} selections={props.selections} />
        )
      } else if (card.type === 'Moment') {
        return (
          <Moment object={card} selections={props.selections} />
        )
      } else if (card.type === 'Creation') {
        return (
          <Creation object={card} selections={props.selections} />
        )
      } else if (card.type === 'Passive') {
        return  (
          <Passive object={card} selections={props.selections} />
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
      <div className='cardList playerHand'>
        {cardList}
      </div>
    </div>
  )
}

export default PlayerHand
