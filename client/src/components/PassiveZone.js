import React, { Component } from 'react'
import Passive from './Passive'

class PassiveZone extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let passiveList
        if (this.props.passives.length > 0) {
            passiveList = this.props.passives.map((passive) =>
                <Passive object={passive} targetSelection={this.props.targetSelection} handleSelection={this.props.handleSelection} />
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