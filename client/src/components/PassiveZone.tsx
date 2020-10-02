import React from 'react'
import EntityContainer from './EntityContainer'
import Passive from './Passive'

class PassiveZone extends EntityContainer {
    render() {
        let passiveList
        if (this.props.contents.length > 0) {
            passiveList = this.props.contents.map((passive) =>
                <Passive object={passive} selections={this.props.selections} />
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