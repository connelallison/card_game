import React from 'react'
import EntityContainer from './EntityContainer'
import Passive from './Passive'

class PassiveZone extends EntityContainer {
    render() {
        let passiveList
        if (this.props.contents.length > 0) {
            passiveList = this.props.contents.map((passive, index) =>
                <Passive big={false} hover={false} key={passive.objectID || `Passive:${index}`} object={passive} animations={this.props.animations} selections={this.props.selections} />
            )
        } else {
            passiveList = [
                <p>No passives in play.</p>,
            ]
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