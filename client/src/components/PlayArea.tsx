import React, { Component } from 'react'
import { TargetSelection } from './TargetableEntity'

interface PlayAreaProps {
  children: JSX.Element[]
  targetSelection: TargetSelection
  handleSelection: (object: any) => void
}

class PlayArea extends Component {
  props!: PlayAreaProps
  constructor(props: PlayAreaProps) {
    super(props)
    this.state = {}
  }

  canBeTargeted() {
    return this.props.targetSelection && this.props.targetSelection.validTargets.includes('confirm')
  }

  targetType(): string {
    return this.props.targetSelection && this.props.targetSelection.hostile ? 'hostileTarget' : 'nonHostileTarget'
  }

  outlineStatus(): string {
    return this.canBeTargeted() ? this.targetType() : ''
  }

  render() {
    const styleClasses = this.outlineStatus() + " playarea"
    return (
      <div onClick={event => {if (this.canBeTargeted()) this.props.handleSelection('confirm')}} className={styleClasses}>
        {this.props.children}
      </div>
    )
  }
}

export default PlayArea
