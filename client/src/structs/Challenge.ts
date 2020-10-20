import { LobbyPlayerData } from "./LobbyPlayerData";

export type Challenge = IncomingChallenge | AcceptedChallenge

export interface IncomingChallenge {
    opponent: LobbyPlayerData
    expiry: number
    accepted: false
    incoming: boolean
}

export interface AcceptedChallenge {
    opponent: LobbyPlayerData
    accepted: true
    incoming: boolean
}