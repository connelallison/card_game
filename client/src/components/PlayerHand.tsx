import React from 'react'
import Follower from './Follower'
import Moment from './Moment'
import Unknown from './Unknown'
import Creation from './Creation'
import Passive from './Passive'
import { EntityContainerProps } from './EntityContainer'
import Leader from './Leader'

const PlayerHand = (props: EntityContainerProps) => {
  let cardList
  if (props.contents.length > 0) {
    cardList = props.contents.map((card, index) => {
      if (card.type === 'unknown') {
        return (<Unknown big={false} key={`Unknown:${index}`} hover={false} object={card} animations={props.animations} selections={props.selections} />)
      } else if (card.type === 'Follower') {
        return (
          <Follower big={false} hover={false} key={card.objectID} object={card} animations={props.animations} selections={props.selections} />
        )
      } else if (card.type === 'Moment') {
        return (
          <Moment big={false} hover={false} key={card.objectID} object={card} animations={props.animations} selections={props.selections} />
        )
      } else if (card.type === 'Creation') {
        return (
          <Creation big={false} hover={false} key={card.objectID} object={card} animations={props.animations} selections={props.selections} />
        )
      } else if (card.type === 'Passive') {
        return (
          <Passive big={false} hover={false} key={card.objectID} object={card} animations={props.animations} selections={props.selections} />
        )
      } else if (card.type === 'Leader') {
        return (
          <Leader big={false} hover={false} key={card.objectID} object={card} animations={props.animations} selections={props.selections} />
        )
      } else {
        return new Error('card is not a follower, moment, or creation')
      }
    })
  } else {
    cardList =       <p className='emptyZone'>No cards in hand.</p>
      // <br />,
      // <br />,
      // <br />,
      // <br />
    
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
