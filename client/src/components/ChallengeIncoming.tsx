import React, { Component } from "react";
import { IncomingChallenge } from "../structs/Challenge";
import { LobbyPlayerData } from "../structs/LobbyPlayerData";
import { LobbyPlayerName } from "./LobbyPlayerName";

interface ChallengeIncomingState {
    expiry: number
    opponent: LobbyPlayerData
    countdown: number
}

interface ChallengeIncomingProps {
    challenge: IncomingChallenge
    acceptChallenge: () => void
    cancelChallenge: () => void
}

class ChallengeIncoming extends Component {
    props!: ChallengeIncomingProps
    state: ChallengeIncomingState
    timer: NodeJS.Timeout

    constructor(props: ChallengeIncomingProps) {
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
            <div className='challengeIncoming' >
                <h2>Incoming Challenge!</h2>
                <p><LobbyPlayerName playerName={this.state.opponent.name} nameNum={this.state.opponent.nameNum}/> would like to play a game. (expires in {turnTime}s)</p>
                <br/>
                <span className='challengeButtons'>
                    <button onClick={this.props.acceptChallenge}>Accept</button>
                    <button onClick={this.props.cancelChallenge}>Decline</button>
                </span>
            </div>
        )
    }
}

export default ChallengeIncoming