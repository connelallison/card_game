import React from 'react'
import Card from './Card'
import HoverCard from './HoverCard'

class Creation extends Card {
  hoverCard(object): JSX.Element | null {
    return <HoverCard object={object} animations={this.props.animations} selections={this.props.selections}></HoverCard>
  }

  render() {
    const costLabel = this.props.object.subtype === 'Technique' && this.props.object.zone === 'creationZone'
      ? this.statLabel('cost')
      : null

    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
        <div className={`cardClassColour ${this.cardClass()}`}></div>
        {this.fortuneOverlay()}
        {this.deathOverlay()}
        {this.actionOverlay()}
        {this.mulliganOverlay()}
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        {/* <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p> */}
        {this.boldedText()}
        <div className="multicolour-line">
          {costLabel}
          {this.statLabel('attack')}
          <p className='charges-label stat-label'>{this.props.object.charges}C</p>
        </div>
        {this.addedText()}
        {this.tooltips()}
        {this.relatedCard()}
      </div>
    )
  }
}

export default Creation
