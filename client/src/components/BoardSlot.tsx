import React from 'react'
import Follower from './Follower'
import TargetableEntity from './TargetableEntity'

class BoardSlot extends TargetableEntity {
    render() {
        const styleClasses = this.outlineStatus() + ' card boardSlot'
        let slot
        if (this.props.object.follower) {
            slot = <Follower object={this.props.object.follower} targetSelection={this.props.targetSelection} handleSelection={this.props.handleSelection} />
        } else {
            slot = <div onClick={event => this.props.handleSelection(this.props.object)} className={styleClasses}>Empty Slot</div>
        }
        return slot
    }
}

export default BoardSlot
