import React, { Component } from 'react'
import TargetableEntity from './TargetableEntity'

class Leader extends TargetableEntity {
   render() {
    const styleClasses = this.outlineStatus() + " leader"
    return (
      <div onClick={event => this.props.handleSelection(this.props.object)} className={styleClasses} >
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        <p className={`card-text`}>{this.props.object.text}</p>
        <div className="multicolour-line">
          {this.statLabel('attack')}
          {this.statLabel('health')}
          {this.statLabel('armour')}
          <p className='cost-label stat-label'>{this.props.object.currentMoney}/{this.props.object.maxMoney}M</p>
        </div>
      </div>
    )
  }

}

export default Leader
