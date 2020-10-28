import React, { Component } from "react";
import { LobbyPlayerData } from "../structs/LobbyPlayerData";
import { LobbyPlayerName } from "./LobbyPlayerName";

class LobbyPlayer extends Component {
    props!: { 
        player: LobbyPlayerData
        sendChallenge: (opponentID: string) => void
     }

    render() {
        const name = <LobbyPlayerName playerName={this.props.player.name} nameNum={this.props.player.nameNum} />
        const status = this.props.player.status === 'game' ? 'In Game' : this.props.player.status === 'challenge' ? 'Challenge Pending' : 'In Lobby'
        const opponent = this.props.player.opponent ? <LobbyPlayerName playerName={this.props.player.opponent.name} nameNum={this.props.player.opponent.nameNum} /> : '(none)'
        const action = this.props.player.status === 'game'
            // ? <button className='lobbyPlayerButton' >Spectate</button>
            ? '(none)'
            : this.props.player.status === 'lobby'
                ? <button className='lobbyPlayerButton' onClick={() => this.props.sendChallenge(this.props.player.socketID)} >Challenge</button>
                : '(none)'
        return <tr>
            <td className='lobbyPlayerName'>{name}</td>
            <td className='lobbyPlayerStatus'>{status}</td>
            <td className='lobbyPlayerOpponent'>{opponent}</td>
            <td className='lobbyPlayerAction'>{action}</td>
        </tr>
    }
}

export default LobbyPlayer