import React, { Component } from 'react'
import Follower from './Follower.js'
import BoardSlot from './BoardSlot.js'

class BoardHalf extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // this.handleClick = this.handleClick.bind(this)
    // this.canBeTargeted = this.canBeTargeted.bind(this);
  }

  // canBeTargeted() {
  //   // console.log(this.props)
  //   return this.props.selected !== null && this.props.selected.validTargets === null
  //   // return this.props.selected !== null && this.props.selected !== this.props.object
  // }

  // handleClick() {
  //   if (this.canBeTargeted()) {
  //     this.props.interactivity.chooseTarget(null)
  //   } else {
  //     this.props.interactivity.invalidMove()
  //   }
  // }

  render() {
    let slotList
    if (this.props.slots.length > 0) {
      slotList = this.props.slots.map((slot) => 
        <BoardSlot object={slot} selected={this.props.selected} selectedSlot={this.props.selectedSlot} interactivity={this.props.interactivity} />
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
