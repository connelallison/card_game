import React, { Component } from 'react'
import Card from './Card'

class Leader extends Card {
  bigCard() {
    return this.props.big ? null : <Leader big object={this.props.object} selections={this.props.selections} /> 
  }

   render() {
    // const styleClasses = this.outlineStatus() + " leader"
    const moneyLabel = (this.props.object.currentMoney !== null && this.props.object.maxMoney !== null) 
      ? <p className='cost-label stat-label'>{this.props.object.currentMoney}/{this.props.object.maxMoney}M</p>
      : null
    return (
      // <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={styleClasses} >
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()} >
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        <p className={`card-text`}>{this.props.object.text}</p>
        <div className="multicolour-line">
          {this.statLabel('attack')}
          {this.statLabel('health')}
          {this.statLabel('armour')}
          {moneyLabel}
        </div>
      </div>
    )
  }

}

export default Leader
