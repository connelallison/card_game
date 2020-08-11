import React, { Component } from 'react'
import Passive from './Passive.js'

class PassiveZone extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let passiveList
        // if (this.props.passives.length > 0) {
        //   if (this.props.mine) {
        //     passiveList = this.props.passives.map((passive) => (
        //         <Passive object={passive} selected={this.props.selected} interactivity={this.props.interactivity} />
        //       )
        //     )
        //   } else {
        //     passiveList = this.props.passives.map((passive) => (
        //         <Passive object={passive} selected={this.props.selected} interactivity={this.props.interactivity} />
        //       )
        //     )
        //   }
        // } else {
        passiveList = [
            <p>No passives in play.</p>,
        ]
        // }

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