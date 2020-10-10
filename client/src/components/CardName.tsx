import React from 'react'
import Creation from './Creation'
import Follower from './Follower'
import Leader from './Leader'
import LeaderTechnique from './LeaderTechnique'
import Moment from './Moment'
import Passive from './Passive'
import TargetableEntity from './TargetableEntity'
import Unknown from './Unknown'

class CardName extends TargetableEntity {
    hoverCard(object): JSX.Element | null {
        if (object.type === 'unknown') {
            return <Unknown big={false} hover object={object} selections={this.props.selections} />
        } else if (object.type === 'Follower') {
            return <Follower big={false} hover object={object} selections={this.props.selections} />
        } else if (object.type === 'Moment') {
            return <Moment big={false} hover object={object} selections={this.props.selections} />
        } else if (object.type === 'Creation') {
            return <Creation big={false} hover object={object} selections={this.props.selections} />
        } else if (object.type === 'Passive') {
            return <Passive big={false} hover object={object} selections={this.props.selections} />
        } else if (object.type === 'Leader') {
            return <Leader big={false} hover object={object} selections={this.props.selections} />
        } else if (object.type === 'LeaderTechnique') {
            return <LeaderTechnique big={false} hover object={object} selections={this.props.selections} />
        } else return null
    }

    render() {
        const styleClasses = this.outlineStatus() + ' cardName'
        const callback = event => {
            // event.stopPropagation()
            this.props.selections.handleSelection(this.props.object)
        }
        return (
            <div className={styleClasses} onClick={callback}>
                {this.statLabel('cost')}
                <p>{this.props.object.name}</p>
                {this.hoverCard(this.props.object)}
            </div>
        )
    }
}

export default CardName
