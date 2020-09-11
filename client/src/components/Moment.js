import React, { Component } from 'react'

class Spell extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.canBeTargeted = this.canBeTargeted.bind(this);
  }

  canBeTargeted() {
    return this.props.selected !== null && this.props.selected.validTargets !== null && this.props.selected.validTargets.includes(this.props.object.objectID)
    // return this.props.selected !== null && this.props.selected !== this.props.object
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
    const textLength = this.props.object.dynamicCardText.length > 70 ? 'text-long' :
      this.props.object.dynamicCardText.length > 35 ? 'text-medium' : 'text-short'
    const nameLength = this.props.object.name.length > 22 ? 'name-long' : 
      this.props.object.name.length > 17 ? 'name-medium' : 'name-short'
    const outlineStatus = this.props.selected === this.props.object ? "isSelected" :
      this.props.selected !== null && this.props.selected !== this.props.object && this.canBeTargeted() ? "canBeTargeted" :
        this.props.selected === null && this.props.object.canBeSelected ? "canBeSelected" : ""
    const styleClasses = outlineStatus + " spell card"
    const handInfo = this.props.object.zone === 'hand' ? (
      <div className="multicolour-line text-medium">
        <p className='cost-label stat-label'>{this.props.object.cost}M</p>
        <p>{this.props.object.subtype} {this.props.object.type}</p>
      </div>
    ) : null
    return (
      <div onClick={this.handleClick} className={styleClasses}>
        <p className={`card-name ${nameLength}`}>{this.props.object.name}</p>
        {handInfo}
        <p className={`card-text ${textLength}`}>{this.props.object.dynamicCardText}</p>
        {/* <br /> */}
        {/* <div className="multicolour-line">
          <p className='cost-label stat-label'>{this.props.object.cost}C</p>
        </div> */}
        {/* <br /> */}
      </div>
    )
  }

}

export default Spell
