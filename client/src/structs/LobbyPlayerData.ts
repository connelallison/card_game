export interface LobbyPlayerData {
    socketID: string
    name: string
    nameNum: string
    status: 'game' | 'lobby' | 'challenge'
    opponent?: LobbyPlayerData
}