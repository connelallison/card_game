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
    return (
      <div onClick={this.handleClick} className={styleClasses} >
        <p className='card-name'>{this.props.object.name}</p>
        <p className={`card-text`}>{this.props.object.staticCardText}</p>
        <div className="multicolour-line">
          {attackLabel}
          <p className='health-label stat-label'>{this.props.object.health}H</p>
          <p className='cost-label stat-label'>{this.props.object.currentMana}/{this.props.object.maxMana}C</p>
        </div>
      </div>
    )
  }

}

export default Leader
