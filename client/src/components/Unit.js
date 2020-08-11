import React, { Component } from 'react'

class Unit extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this);
    this.canBeTargeted = this.canBeTargeted.bind(this);
  }

  canBeTargeted () {
    // console.log(this.props)
    return this.props.selected !== null && this.props.selected.validTargets !== null && this.props.selected.validTargets.includes(this.props.object.objectID)
    // return this.props.selected !== null && this.props.selected !== this.props.object
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
    const textLength = this.props.object.staticCardText.length > 70 ? 'text-long' : 
                       this.props.object.staticCardText.length > 35 ? 'text-medium' : 'text-short'
    const outlineStatus = this.props.selected === this.props.object ? "isSelected" :
      this.props.selected !== null && this.props.selected !== this.props.object && this.canBeTargeted() ? "canBeTargeted" :
        this.props.selected === null && this.props.object.canBeSelected ? "canBeSelected" : ""
    const styleClasses = outlineStatus + " unit card"
    const type = this.props.object.type.charAt(0).toUpperCase() + this.props.object.type.slice(1)
    const subtype = this.props.object.subtype.charAt(0).toUpperCase() + this.props.object.subtype.slice(1)
    const handInfo = this.props.object.zone === 'hand' ? (
      <div className="multicolour-line text-medium">
        <p className='cost-label stat-label'>{this.props.object.cost}C</p>
        <p>{subtype} {type}</p>
      </div>
    ) : null
    return (
      <div onClick={this.handleClick} className={styleClasses}>
        <p className='card-name'>{this.props.object.name}</p>
        {handInfo}
        <p className={`card-text ${textLength}`}>{this.props.object.staticCardText}</p>
        {/* <br /> */}
        <div className="multicolour-line">
          <p className='attack-label stat-label'>{this.props.object.attack}A</p> 
          <p className='health-label stat-label'>{this.props.object.health}H</p>
        </div>
      </div>
    )
  }

}

export default Unit