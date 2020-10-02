import React, { Component } from 'react'
import TargetableEntity from './TargetableEntity'

class Passive extends TargetableEntity {
  render() {
    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={`${this.outlineStatus()} passive card`}>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
      </div>
    )
  }

}

export default Passive
