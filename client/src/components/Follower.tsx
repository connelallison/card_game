import React, { Component } from 'react'
import BoardSlot from './BoardSlot'
import Card from './Card'
import HoverCard from './HoverCard'

class Follower extends Card {
  hoverCard(object): JSX.Element | null {
    return <HoverCard object={object} animations={this.props.animations} selections={this.props.selections}></HoverCard>
  }

  categories() {
    return this.props.object && this.props.object.categories
      ? <div className='followerCategories'>{this.props.object.categories.map(category => <span key={`${this.props.object.objectID}:${category}`} className={`followerCategory ${(category === '♀' || category === '⚙') ? 'extraBold' : ''}`}>{category}</span>)}</div>
      : null
  }

  inPlay() {
    return this.props.object.zone === 'board' ? ' inPlay' : ''
  }

  // slot() {
  //   return this.props.object.zone === 'board'
  //     ? <BoardSlot  selections={this.props.selections} animations={this.props.animations} object={{ text: '', name: '', type: 'BoardSlot' }}></BoardSlot>
  //     : null
  // }

  render() {
    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses() + this.inPlay()}>
        <div className={`cardClassColour ${this.cardClass()}`}></div>
        {/* {this.slot()} */}
        {this.fortuneOverlay()}
        {this.guardOverlay()}
        {this.damageOverlay()}
        {this.healingOverlay()}
        {this.deathOverlay()}
        {this.actionOverlay()}
        {this.mulliganOverlay()}
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        {/* <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p> */}
        {this.boldedText()}
        <div className="multicolour-line">
          {this.statLabel('attack')}
          {this.categories()}
          {this.statLabel('health')}
        </div>
        {this.addedText()}
        {this.tooltips()}
        {this.relatedCard()}
      </div>
    )
  }
}

export default Follower
