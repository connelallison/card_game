import React from 'react'
import Card from './Card'

class Creation extends Card {
  bigCard() {
    return this.props.big ? null : <Creation big object={this.props.object} selections={this.props.selections} />
  }

  render() {
    const costLabel = this.props.object.subtype === 'Technique' && this.props.object.zone === 'creationZone'
      ? this.statLabel('cost')
      : null

    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
        <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
        {this.handInfo()}
        <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
        <div className="multicolour-line">
          {costLabel}
          {this.statLabel('attack')}
          <p className='charges-label stat-label'>{this.props.object.charges}C</p>
        </div>
      </div>
    )
  }
}

export default Creation
