import React from 'react'
import BoardSlot from './BoardSlot'
import EntityContainer, { EntityContainerProps } from './EntityContainer'

export interface BoardHalfProps extends EntityContainerProps {
  maxSlots: number
}

class BoardHalf extends EntityContainer {
  props!: BoardHalfProps

  paddingSlotObject() {
    return { text: '', name: '', type: 'BoardSlot' }
  }

  render() {
    let slotList
    if (this.props.contents.length > 0) {
      slotList = this.props.contents.map((slot, index) =>
        <BoardSlot key={slot.objectID || `BoardSlot:${index}`}  object={slot} animations={this.props.animations} selections={this.props.selections} />
      )
      if (this.props.maxSlots > this.props.contents.length) {
        for (let index = this.props.contents.length; index < this.props.maxSlots; index++) {
          slotList[index] = <BoardSlot padding key={`BoardSlot:${index}`}  object={this.paddingSlotObject()} animations={this.props.animations} selections={this.props.selections} />    
        }
      }
    } else {
      slotList = [
        <p className='emptyZone'>No slots on board.</p>,
      ]
    }

    return (
      <div className='cardList'>
        {slotList}
      </div>
    )
  }

}

export default BoardHalf
