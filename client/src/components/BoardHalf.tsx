import React from 'react'
import BoardSlot from './BoardSlot'
import EntityContainer from './EntityContainer'

class BoardHalf extends EntityContainer {
  render() {
    let slotList
    if (this.props.contents.length > 0) {
      slotList = this.props.contents.map((slot) =>
        <BoardSlot object={slot} selected={this.props.selected} targetSelection={this.props.targetSelection} handleSelection={this.props.handleSelection} />
      )
    } else {
      slotList = [
        <p>No slots on board.</p>,
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
