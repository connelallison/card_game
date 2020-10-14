import React, { Component } from 'react'
import Card from './Card'
import HoverCard from './HoverCard'

class Follower extends Card {
  hoverCard(object): JSX.Element | null {
    return <HoverCard object={object} selections={this.props.selections}></HoverCard>
  }

  categories() {
    return this.props.object && this.props.object.categories
      ? <div className='followerCategories'>{this.props.object.categories.map(category => <span className='followerCategory'>{category}</span>)}</div>
      : null
  }

  render() {
    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
        <div className={`cardClassColour ${this.cardClass()}`}></div>
        {this.fortuneOverlay()}
        {this.guardOverlay()}
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
