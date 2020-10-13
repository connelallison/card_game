import React, { Component } from 'react'
import Card from './Card'
import HoverCard from './HoverCard'

class Moment extends Card {
  hoverCard(object): JSX.Element | null {
    return <HoverCard object={object} selections={this.props.selections}></HoverCard>
  }

  render() {
    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
        <div className={`cardClassColour ${this.cardClass()}`}></div>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
        {this.addedText()}
        {this.tooltips()}
        {this.relatedCard()}
      </div>
    )
  }

}

export default Moment
