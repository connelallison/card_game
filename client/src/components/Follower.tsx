import React, { Component } from 'react'
import Card from './Card'

class Follower extends Card {
  bigCard() {
    return this.props.big ? null : <Follower big object={this.props.object} selections={this.props.selections} /> 
  }

  render() {
    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
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
