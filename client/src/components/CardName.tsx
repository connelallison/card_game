import React from 'react'
import Creation from './Creation'
import Follower from './Follower'
import Leader from './Leader'
import Moment from './Moment'
import Passive from './Passive'
import TargetableEntity from './TargetableEntity'
import Unknown from './Unknown'

class CardName extends TargetableEntity {
    bigCard(): JSX.Element | null {
        if (this.props.object.type === 'unknown') {
            return <Unknown big object={this.props.object} selections={this.props.selections} />
        } else if (this.props.object.type === 'Follower') {
            return <Follower big object={this.props.object} selections={this.props.selections} />
        } else if (this.props.object.type === 'Moment') {
            return <Moment big object={this.props.object} selections={this.props.selections} />
        } else if (this.props.object.type === 'Creation') {
            return <Creation big object={this.props.object} selections={this.props.selections} />
        } else if (this.props.object.type === 'Passive') {
            return <Passive big object={this.props.object} selections={this.props.selections} />
        } else if (this.props.object.type === 'Leader') {
            return <Leader big object={this.props.object} selections={this.props.selections} />
        } else return null
    }

    render() {
        const styleClasses = this.outlineStatus() + ' cardName'
        const callback = event => {
            event.stopPropagation()
            this.props.selections.handleSelection(this.props.object)
        }
        return (
            <div className={styleClasses} onClick={callback}>
                {this.statLabel('cost')}
                <p>{this.props.object.name}</p>
            </div>
        )
    }
}

export default CardName
