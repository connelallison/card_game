import React, { Component } from 'react'
import Unit from './Unit.js'

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
    let unitList
    if (this.props.units.length > 0) {
      unitList = this.props.units.map((unit) => 
        <Unit object={unit} selected={this.props.selected} interactivity={this.props.interactivity} />
      )
    } else {
      unitList = [
        <p>No units on board.</p>,
      ]
    }

    return (
      <div className="boardhalf">
        <div className='cardList'>
          {unitList}
        </div>
      </div>
    )
  }

}

export default BoardHalf
