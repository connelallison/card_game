import React, { Component } from 'react'
import { Selections, TargetSelection } from './TargetableEntity'

interface PlayAreaProps {
  children: JSX.Element[]
  selections: Selections
}

class PlayArea extends Component {
  props!: PlayAreaProps
  constructor(props: PlayAreaProps) {
    super(props)
    this.state = {}
  }

  canBeTargeted() {
    return this.props.selections.selectionsEnabled && this.props.selections.targetSelection && this.props.selections.targetSelection.validTargets.includes('confirm')
  }

  targetType(): string {
    return this.props.selections.targetSelection && this.props.selections.targetSelection.hostile ? 'hostileTarget' : 'nonHostileTarget'
  }

  outlineStatus(): string {
    return this.canBeTargeted() ? this.targetType() : ''
  }

  render() {
    const styleClasses = this.outlineStatus() + " playarea"
    return (
      <div onClick={event => {if (this.canBeTargeted()) this.props.selections.handleSelection('confirm')}} className={styleClasses}>
        {this.props.children}
      </div>
    )
  }
}

export default PlayArea
