import React, { Component } from 'react'
import Minion from './Minion.js'

class BoardHalf extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.canBeTargeted = this.canBeTargeted.bind(this);
  }

  canBeTargeted() {
    // console.log(this.props)
    return this.props.selected !== null && this.props.selected.validTargets === null
    // return this.props.selected !== null && this.props.selected !== this.props.object
  }

  handleClick() {
    if (this.canBeTargeted()) {
      this.props.interactivity.chooseTarget(null)
    } else {
      this.props.interactivity.invalidMove()
    }
  }

  render() {
    let minionList
    if (this.props.minions.length > 0) {
      if (this.props.mine) {
        minionList = this.props.minions.map((minion) => {
          return (
            <Minion object={minion} selected={this.props.selected} interactivity={this.props.interactivity} />
          )
        })
      } else {
        minionList = this.props.minions.map((minion) => {
          return (
            <Minion object={minion} selected={this.props.selected} interactivity={this.props.interactivity} />
          )
        })
      }
    } else {
      minionList = [
        <p>No minions on board.</p>,
        <br />,
        <br />,
        <br />,
        <br />
      ]
    }

    let owner
    if (this.props.mine) {
      owner = 'My'
    } else {
      owner = "Opponent's"
    }

    const outlineStatus = this.canBeTargeted() ? "canBeTargeted" : ""
    const styleClasses = outlineStatus + " boardhalf"
    return (
      // <div onClick={this.handleClick} className={styleClasses}>
      <div className="boardhalf">
        <p className='lowerMargin'>{owner} current minions:</p>
        <div className='cardList'>
          {minionList}
        </div>
      </div>
    )
  }

}

export default BoardHalf
