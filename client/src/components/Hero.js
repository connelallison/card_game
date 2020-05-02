import React, { Component } from 'react'

class Hero extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.canBeTargeted = this.canBeTargeted.bind(this);
  }

  canBeTargeted () {
    return this.props.selected !== null && this.props.selected.validTargets !== null && this.props.selected.validTargets.includes(this.props.object.objectID)
  }

  handleClick () {
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

  render () {
    const outlineStatus = this.props.selected === this.props.object ? "isSelected" :
      this.props.selected !== null && this.props.selected !== this.props.object && this.canBeTargeted() ? "canBeTargeted" :
        this.props.selected === null && this.props.object.canBeSelected ? "canBeSelected" : ""
    const styleClasses = outlineStatus + " hero"
    return (
    <div onClick={this.handleClick} className={styleClasses} >
      <p>{this.props.mine ? "This is my hero." : "This is the enemy hero."}</p>
      <p>Hero's attack: {this.props.object.attack}</p>
      <p>Hero's health: {this.props.object.health}</p>
      <p>Hero's current mana: {this.props.object.currentMana}</p>
      <p>Hero's max mana: {this.props.object.maxMana}</p>
    </div>
  )
  }

}

export default Hero
