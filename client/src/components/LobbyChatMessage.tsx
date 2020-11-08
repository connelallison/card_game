import React, { Component } from "react";
import { ChatMessageData } from "../structs/ChatMessageData";
import { LobbyPlayerName } from "./LobbyPlayerName";

class LobbyChatMessage extends Component {
    props!: { message: ChatMessageData, mine: boolean }

    render() {
        const message = this.props.message
        const lines = message.lines.map((line, index) => (
            <span className='chatMessageTextSpan' key={`${message.senderID}:${line.time}:${index}`}>
                <p className={`chatMessageText ${this.props.mine ? 'mine' : ''}`}>{line.line}</p>
                <div className='addedText timestamp' >{new Date(line.time).toLocaleTimeString()}</div>
            </span>
        ))
        return (
            <div className={`chatMessage ${this.props.mine ? 'mine' : ''}`}>
                <p className={`chatMessageName ${this.props.mine ? 'mine' : ''}`} >
                    <LobbyPlayerName playerName={message.senderName} nameNum={message.nameNum} />
                    {/* <span className='timestamp'>{`${new Date(message.time).toLocaleTimeString()}`}</span> */}
                </p>
                {lines}
            </div>
        )
    }
}

export default LobbyChatMessage