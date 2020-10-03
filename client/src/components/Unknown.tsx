import React, { Component } from 'react'
import Card from './Card'

class Unknown extends Card {
  bigCard() {
    return this.props.big ? null : <Unknown big object={this.props.object} selections={this.props.selections} />
  }
  
  // props!: {big: boolean}
  // constructor(props: { big: boolean }) {
  //   super(props)
  // }
  render() {
      // return (
      //   <div className={`${this.props.big ? 'big' : ''} unknown card`}>
      //     <p>Unknown Card</p>
      //     <br />
      //     <br />
      //     <br />
      //   </div>
      // )
    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
        <br/>
        <p className={`card-name ${this.nameLength()}`}>Unknown Card</p>
        {/* {this.handInfo()} */}
        {/* <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p> */}
        {/* <div className="multicolour-line">
          {this.statLabel('attack')}
          {this.statLabel('health')}
        </div> */}
      </div>
    )
  }
}

export default Unknown
