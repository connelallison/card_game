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
    const attackLabel = this.props.object.attack > 0 ? (
      <p className='attack-label stat-label'>{this.props.object.attack}A</p>
    ) : null
    const armourLabel = this.props.object.armour > 0 ? (
      <p className='armour-label stat-label'>{this.props.object.armour}A</p>
    ) : null
    const nameLength = this.props.object.name.length > 22 ? 'name-long' : 
                       this.props.object.name.length > 17 ? 'name-medium' : 'name-short'
    return (
      <div onClick={this.handleClick} className={styleClasses} >
        <p className={`card-name ${nameLength}`}>{this.props.object.name}</p>
        <p className={`card-text`}>{this.props.object.dynamicCardText}</p>
        <div className="multicolour-line">
          {attackLabel}
          <p className='health-label stat-label'>{this.props.object.health}H</p>
          {armourLabel}
          <p className='cost-label stat-label'>{this.props.object.currentMoney}/{this.props.object.maxMoney}M</p>
        </div>
      </div>
    )
  }

}

export default Leader
