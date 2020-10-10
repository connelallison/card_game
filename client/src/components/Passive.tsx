import React, { Component } from 'react'
import Card from './Card'

class Passive extends Card {
  // hoverCard() {
  //   return this.props.big ? null : <Passive big hover={false} object={this.props.object} selections={this.props.selections} />
  // }

  render() {
    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
        <div className={`cardClassColour ${this.cardClass()}`}></div>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
        {this.addedText()}
        {this.tooltips()}
      </div>
    )
  }

}

export default Passive
