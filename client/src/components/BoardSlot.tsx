import React from 'react'
import Card from './Card'
import Follower from './Follower'

class BoardSlot extends Card {
    render() {
        let slot
        if (this.props.object.follower) {
            slot = <Follower big={false} hover={false} object={this.props.object.follower} selections={this.props.selections} />
        } else {
            slot = (
                <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
                    <p>Empty Slot</p>
                    <div className="multicolour-line">
                        {this.statLabel('attack')}
                        {this.statLabel('health')}
                    </div>
                    {this.addedText()}
                </div>
            )
        }
        return slot
    }
}

export default BoardSlot
