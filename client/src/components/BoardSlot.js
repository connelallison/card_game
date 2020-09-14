import React, { Component } from 'react'
import Follower from './Follower.js'

class BoardSlot extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleClick = this.handleClick.bind(this);
        this.canBeTargeted = this.canBeSelected.bind(this);
    }

    canBeSelected() {
        return this.props.selected !== null
            && this.props.selectedSlot === null
            && this.props.selected.type === 'Follower'
            && this.props.selected.zone === 'hand'
            && this.props.selected.validSlots !== null
            && this.props.selected.validSlots.includes(this.props.object.objectID)
    }

    handleClick() {
        if (this.props.selectedSlot === this.props.object) {
            this.props.interactivity.clearSelectedSlot();
        } else if (this.canBeSelected()) {
            if (!this.props.selected.targeted || this.props.selected.validTargets.length === 0) {
                // console.log('chooseSelectedSlotNoTarget running')
                this.props.interactivity.chooseSelectedSlotNoTarget(this.props.object)
            } else {
                // console.log('chooseSelectedSlot running')
                this.props.interactivity.chooseSelectedSlot(this.props.object)
            }
        } else {
            this.props.interactivity.invalidMove()
        }
    }

    render() {
        const outlineStatus = this.props.selectedSlot === this.props.object ? "isSelected" :
            this.canBeSelected() ? "canBeSelected" : ""
        const styleClasses = outlineStatus + ' card boardSlot'
        let slot
        if (this.props.object.follower) {
            slot = <Follower
                object={this.props.object.follower} 
                selected={this.props.selected} 
                selectedSlot={this.props.selectedSlot}
                interactivity={this.props.interactivity}
            />
        } else {
            slot = <div onClick={this.handleClick} className={styleClasses}>Empty Slot</div>
        }
        return slot
    }

}

export default BoardSlot
