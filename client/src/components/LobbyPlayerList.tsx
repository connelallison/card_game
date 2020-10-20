import React, { Component } from 'react'
import { LobbyPlayerData } from '../structs/LobbyPlayerData'
import LobbyPlayer from './LobbyPlayer'

export interface LobbyPlayersProps {
    players: LobbyPlayerData[]
    sendChallenge: (opponentID: string) => void
}

class LobbyPlayerList extends Component {
    props!: LobbyPlayersProps

    render() {
        const testBot: LobbyPlayerData = {
            name: 'TestBot (AI)',
            nameNum: '',
            status: 'lobby',
            socketID: 'TestBot',
        }
        const lobbyPlayers = [<LobbyPlayer key={'TestBot'} sendChallenge={this.props.sendChallenge} player={testBot} ></LobbyPlayer>]
        this.props.players.forEach(player => lobbyPlayers.push(<LobbyPlayer key={player.socketID} sendChallenge={this.props.sendChallenge}player={player}></LobbyPlayer>))

        return <div className='lobbyPlayerList'>
            <table className='lobbyPlayerListTable'>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Status</td>
                        <td>Opponent</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {lobbyPlayers}
                </tbody>
            </table>
        </div>
    }
}

export default LobbyPlayerList
