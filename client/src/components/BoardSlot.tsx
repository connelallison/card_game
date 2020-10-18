import React from 'react'
import Card, { CardProps } from './Card'
import Follower from './Follower'

export interface BoardSlotProps extends CardProps {
    padding?: boolean
}

class BoardSlot extends Card {
    props!: BoardSlotProps

    followerDying() {
        return (this.props.object.follower && this.props.animations.deathCards[this.props.object.follower.objectID]) ? ' followerDying' : ''
    }

    padding(): string {
        return this.props.padding ? 'padding' : ''
    }

    render() {
        let slot
        if (this.props.object.follower) {
            // slot = <Follower big={false} hover={false} key={this.props.object.objectID} object={this.props.object.follower} animations={this.props.animations} selections={this.props.selections} />
            slot = (
                <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses() + this.followerDying() + ' background'}>
                    <Follower big={false} hover={false} key={this.props.object.objectID} object={this.props.object.follower} animations={this.props.animations} selections={this.props.selections} />
                </div>
            )
        } else {
            slot = (
                <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={`${this.styleClasses()} ${this.padding()}`}>
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
