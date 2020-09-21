import React, { Component } from 'react'
import TargetableEntity from './TargetableEntity'

class Moment extends TargetableEntity {
  render() {
    const styleClasses = this.outlineStatus() + " moment card"
    return (
      <div onClick={event => this.props.handleSelection(this.props.object)} className={styleClasses}>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
      </div>
    )
  }

}

export default Moment
