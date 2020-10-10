import React, { Component } from 'react'
import Card from './Card'

class Follower extends Card {
  // hoverCard() {
  //   return this.props.big ? null : <Follower big hover={false} object={this.props.object} selections={this.props.selections} />
  // }

  categories() {
    return this.props.object && this.props.object.categories
      ? <div className='followerCategories'>{this.props.object.categories.map(category => <span className='followerCategory'>{category}</span>)}</div>
      : null
  }

  render() {
    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
        <div className={`cardClassColour ${this.cardClass()}`}></div>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
        <div className="multicolour-line">
          {this.statLabel('attack')}
          {this.categories()}
          {this.statLabel('health')}
        </div>
        {this.addedText()}
        {this.tooltips()}
      </div>
    )
  }
}

export default Follower
