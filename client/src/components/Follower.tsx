import React, { Component } from 'react'
import TargetableEntity from './TargetableEntity'

class Follower extends TargetableEntity {
  render() {
    const styleClasses = this.outlineStatus() + " follower card"
    const chargeLabel = this.props.object.subtype === 'Nameless'
      ? this.statLabel('charges')
      : null

    return (
      <div onClick={event => this.props.handleSelection(this.props.object)} className={styleClasses}>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
        <div className="multicolour-line">
          {this.statLabel('attack')}
          {this.statLabel('health')}
        </div>
      </div>
    )
  }
}

export default Follower
