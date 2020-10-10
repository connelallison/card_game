import React, { Component } from 'react'
import Card from './Card'
import Creation from './Creation'
import Follower from './Follower'
import LeaderTechnique from './LeaderTechnique'
import Moment from './Moment'
import Passive from './Passive'
import Unknown from './Unknown'

class Leader extends Card {
  // hoverCard() {
  //   return this.props.big ? null : <Leader big hover={false} object={this.props.object} selections={this.props.selections} />
  // }

  hoverCard(object): JSX.Element | null {
    if (object.type === 'unknown') {
        return <Unknown relatedCard hover object={object} selections={this.props.selections} />
    } else if (object.type === 'Follower') {
        return <Follower relatedCard hover object={object} selections={this.props.selections} />
    } else if (object.type === 'Moment') {
        return <Moment relatedCard hover object={object} selections={this.props.selections} />
    } else if (object.type === 'Creation') {
        return <Creation relatedCard hover object={object} selections={this.props.selections} />
    } else if (object.type === 'Passive') {
        return <Passive relatedCard hover object={object} selections={this.props.selections} />
    } else if (object.type === 'Leader') {
        return <Leader relatedCard hover object={object} selections={this.props.selections} />
    } else if (object.type === 'LeaderTechnique') {
        return <LeaderTechnique relatedCard hover object={object} selections={this.props.selections} />
    } else return null
}

  render() {
    // const styleClasses = this.outlineStatus() + " leader"
    const moneyLabel = (this.props.object.zone === 'leaderZone' && this.props.object.currentMoney !== null && this.props.object.maxMoney !== null)
      ? <p className='cost-label stat-label'>{this.props.object.currentMoney}/{this.props.object.maxMoney}M</p>
      : null
    return (
      // <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={styleClasses} >
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()} >
        <div className={`cardClassColour ${this.cardClass()}`}></div>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        <p className={`card-text`}>{this.props.object.text}</p>
        <div className="multicolour-line">
          {this.statLabel('attack')}
          {this.statLabel('health')}
          {this.statLabel('armour')}
          {moneyLabel}
        </div>
        {this.addedText()}
        {this.tooltips()}
        {this.relatedCard()}
      </div>
    )
  }

}

export default Leader
