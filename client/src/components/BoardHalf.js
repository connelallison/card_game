import React, { Component } from 'react'
import BoardSlot from './BoardSlot'

class BoardHalf extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let slotList
    if (this.props.slots.length > 0) {
      slotList = this.props.slots.map((slot) =>
        <BoardSlot object={slot} targetSelection={this.props.targetSelection} handleSelection={this.props.handleSelection} />
      )
    } else {
      slotList = [
        <p>No slots on board.</p>,
      ]
    }

    return (
      <div className="boardhalf">
        <div className='cardList'>
          {slotList}
        </div>
      </div>
    )
  }

}

export default BoardHalf
