import React from 'react'
import EntityContainer from './EntityContainer'
import Passive from './Passive'

class PassiveZone extends EntityContainer {
    render() {
        let passiveList = [
            <Passive key={this.props.contents[0].objectID || `Passive:${0}`} object={this.props.contents[0]} animations={this.props.animations} selections={this.props.selections} />,
            <p className='emptyZone' key='emptyPassives'>No passives in play.</p>
        ]
        if (this.props.contents.length > 1) {
            passiveList = this.props.contents.map((passive, index) =>
                <Passive key={passive.objectID || `Passive:${index}`} object={passive} animations={this.props.animations} selections={this.props.selections} />
            )
        }

        return (
            <div className="passiveZone">
                <div className='cardList passiveList'>
                    {passiveList}
                </div>
            </div>
        )
    }
}

export default PassiveZone