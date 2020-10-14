import React, { Component } from 'react'
import Card from './Card'
import Creation from './Creation'
import Follower from './Follower'
import HoverCard from './HoverCard'
import LeaderTechnique from './LeaderTechnique'
import Moment from './Moment'
import Passive from './Passive'
import Unknown from './Unknown'

class Leader extends Card {
  render() {
    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()} >
        <div className={`cardClassColour ${this.cardClass()}`}></div>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        {/* <p className={`card-text`}>{this.props.object.text}</p> */}
        {this.boldedText()}
        <div className="multicolour-line">
          {this.statLabel('attack')}
          {this.statLabel('health')}
          {this.statLabel('armour')}
          {this.moneyLabel()}
        </div>
        {this.addedText()}
        {this.tooltips()}
        {this.relatedCard()}
      </div>
    )
  }

  hoverCard(object): JSX.Element | null {
    return <HoverCard object={object} selections={this.props.selections}></HoverCard>
}

  moneyLabel() {
    if (this.props.object.currentMoney !== null && this.props.object.maxMoney !== null) {
      const currentMoneyInteger = Math.floor(this.props.object.currentMoney)
      const currentMoneyDecimal = Math.floor((this.props.object.currentMoney % 1) * 10)
      const currentMoneyDecimalSpan = currentMoneyDecimal > 0 ? <span className='decimal'>.{currentMoneyDecimal}</span> : null
      const maxMoneyInteger = Math.floor(this.props.object.maxMoney)
      const maxMoneyDecimal = Math.floor((this.props.object.maxMoney % 1) * 10)
      const maxMoneyDecimalSpan = maxMoneyDecimal > 0 ? <span className='decimal'>.{maxMoneyDecimal}</span> : null

      return (
        <p className={`cost-label stat-label`}>
          {currentMoneyInteger}
          {currentMoneyDecimalSpan}
            /
          {maxMoneyInteger}
          {maxMoneyDecimalSpan}
            M
        </p>
      )
    }
  }
}

export default Leader
