import React from 'react'
import Card from './Card'

class Creation extends Card {
  // hoverCard() {
  //   return this.props.big ? null : <Creation big hover={false} object={this.props.object} selections={this.props.selections} />
  // }

  render() {
    const costLabel = this.props.object.subtype === 'Technique' && this.props.object.zone === 'creationZone'
      ? this.statLabel('cost')
      : null

    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
        <div className={`cardClassColour ${this.cardClass()}`}></div>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
        <div className="multicolour-line">
          {costLabel}
          {this.statLabel('attack')}
          <p className='charges-label stat-label'>{this.props.object.charges}C</p>
        </div>
        {this.addedText()}
        {this.tooltips()}
      </div>
    )
  }
}

export default Creation
