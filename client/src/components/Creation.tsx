import React from 'react'
import TargetableEntity from './TargetableEntity'

class Creation extends TargetableEntity {
  render() {
    const styleClasses = this.outlineStatus() + " creation card"
    const costLabel = this.props.object.subtype === 'Technique' && this.props.object.zone === 'creationZone'
      ? this.statLabel('cost')
      : null

    return (
      <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={styleClasses}>
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
