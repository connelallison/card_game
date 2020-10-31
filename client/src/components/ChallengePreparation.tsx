import React, { Component } from "react";
import { AcceptedChallenge } from "../structs/Challenge";
import { Decks } from "../structs/DeckObject";
import { LobbyPlayerData } from "../structs/LobbyPlayerData";
import DeckSelection from "./DeckSelection";
import { LobbyPlayerName } from "./LobbyPlayerName";

interface ChallengePreparationProps {
    challenge: AcceptedChallenge
    testBotDeckID: string
    deckID: string
    decks: Decks
    testBot?: boolean
    readyChallenge: () => void
    notReadyChallenge: () => void
    cancelChallenge: () => void
    
    updateDeck: (deckID: string) => void
    updateTestBotDeck: (deckID: string) => void
}

class ChallengePreparation extends Component {
    props!: ChallengePreparationProps
    state: { opponent: LobbyPlayerData, ready: boolean }

    constructor(props: ChallengePreparationProps) {
        super(props)
        this.state = {
            opponent: props.challenge.opponent,
            ready: false,
        }
    }

    toggleReady() {
        if (this.state.ready) {
            this.props.notReadyChallenge()
            this.setState({ ready: false })
        } else {
            this.props.readyChallenge()
            this.setState({ ready: true })
        }
    }

    render() {
        const testBot = this.state.opponent.socketID === 'TestBot'
        const testBotDeckSelection = testBot ? (
            <>
                <DeckSelection
                    testBot
                    deckID={this.props.testBotDeckID}
                    decks={this.props.decks}
                    updateDeck={this.props.updateTestBotDeck}
                />
            </>
        ) : null
        return (
            <div className='challengePreparation' >
                <h2>Challenge Accepted!</h2>
                <p>Getting ready for a game against <LobbyPlayerName playerName={this.state.opponent.name} nameNum={this.state.opponent.nameNum} />.</p>
                <br />
                <DeckSelection
                    deckID={this.props.deckID}
                    decks={this.props.decks}
                    updateDeck={this.props.updateDeck}
                />
                {testBotDeckSelection}
                <br />
                <span className='challengeButtons'>
                    <button onClick={() => this.toggleReady()}>{this.state.ready ? 'Unready' : 'Ready'}</button>
                    <button onClick={this.props.cancelChallenge}>Cancel</button>
                </span>
            </div>
        )
    }
}

export default ChallengePreparation