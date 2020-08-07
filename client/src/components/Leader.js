import React, { Component } from 'react'

class Leader extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.canBeTargeted = this.canBeTargeted.bind(this);
  }

  canBeTargeted() {
    return this.props.selected !== null && this.props.selected.validTargets !== null && this.props.selected.validTargets.includes(this.props.object.objectID)
  }

  handleClick() {
    if (this.props.selected === this.props.object) {
      this.props.interactivity.clearSelected();
    } else if (this.props.selected === null && this.props.object.canBeSelected) {
      this.props.interactivity.chooseSelected(this.props.object);
    } else if (this.props.selected !== null && this.props.selected !== this.props.object && this.canBeTargeted()) {
      this.props.interactivity.chooseTarget(this.props.object)
    } else {
      this.props.interactivity.invalidMove()
    }
  }

  render() {
    const outlineStatus = this.props.selected === this.props.object ? "isSelected" :
      this.props.selected !== null && this.props.selected !== this.props.object && this.canBeTargeted() ? "canBeTargeted" :
        this.props.selected === null && this.props.object.canBeSelected ? "canBeSelected" : ""
    const styleClasses = outlineStatus + " leader"
    return (
      <div onClick={this.handleClick} className={styleClasses} >
        <p className='card-name'>{this.props.mine ? "My leader." : "Opponent's leader."}</p>
        <p className={`card-text`}>{this.props.object.staticCardText}</p>
        <div className="multicolour-line">
          <p className='attack-label'>{this.props.object.attack}A</p>
          <p className='health-label'>{this.props.object.health}H</p>
          <p className='cost-label'>{this.props.object.currentMana}/{this.props.object.maxMana}C</p>
        </div>
        {/* 
      <p>Leader's attack: {this.props.object.attack}</p>
      <p>Leader's health: {this.props.object.health}</p>
      <p>Leader's current mana: {this.props.object.currentMana}</p>
      <p>Leader's max mana: {this.props.object.maxMana}</p> */}
      </div>
    )
  }

}

export default Leader
