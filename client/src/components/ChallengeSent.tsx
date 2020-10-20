import React, { Component } from "react";
import { IncomingChallenge } from "../structs/Challenge";
import { LobbyPlayerData } from "../structs/LobbyPlayerData";
import { LobbyPlayerName } from "./LobbyPlayerName";

interface ChallengeSentState {
    expiry: number
    opponent: LobbyPlayerData
    countdown: number
}

interface ChallengeSentProps {
    challenge: IncomingChallenge
    cancelChallenge: () => void
}

class ChallengeSent extends Component {
    props!: ChallengeSentProps
    state: ChallengeSentState
    timer: NodeJS.Timeout

    constructor(props: ChallengeSentProps) {
        super(props)
        this.state = {
            expiry: props.challenge.expiry,
            opponent: props.challenge.opponent,
            countdown: props.challenge.expiry - Date.now()
        }
        this.timer = setInterval(
            () => this.tick(),
            100
        )
    }

    tick() {
        this.setState({
            countdown: (this.state.expiry - Date.now())
        })
    }

    render() {
        const turnTime = Math.ceil(Math.max(0, this.state.countdown / 1000))

        return (
            <div className='challengeSent' >
                <h2>Challenge Sent!</h2>
                <p>Waiting for a response from <LobbyPlayerName playerName={this.state.opponent.name} nameNum={this.state.opponent.nameNum}/>. (expires in {turnTime}s)</p>
                <br/>
                <span className='challengeButtons'>
                    <button onClick={this.props.cancelChallenge}>Cancel</button>
                </span>
            </div>
        )
    }
}

export default ChallengeSent