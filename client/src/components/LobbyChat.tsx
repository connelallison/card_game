import React, { Component } from 'react'
import { ChatMessageData } from '../structs/ChatMessageData'
import LobbyChatMessage from './LobbyChatMessage'

export interface LobbyChatProps {
    socketID: string
    messages: ChatMessageData[]
    sendMessage: (message: string) => void
}

class LobbyChat extends Component {
    props!: LobbyChatProps
    state: { message: string }

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    handleChange(event) {
        this.setState({ message: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        // console.log(event)
        if (!this.state.message) return
        else {
            this.props.sendMessage(this.state.message)
            this.setState({ message: '' })
        }
    }
    // handleSubmit (event) {
    //     event.preventDefault()
    //     if (!this.state.value || this.state.value === this.props.displayName) return
    //     this.props.handleSubmit(this.state.value)
    //   }


    render() {
        const messages = this.props.messages.map(message => (
            <LobbyChatMessage key={`${message.senderID}:${message.lines[0].time}`} mine={message.senderID === this.props.socketID} message={message} />
        ))

        const chat = <div className='lobbyChatMessages' >{messages}</div>

        const messageBox = <form className='lobbyChatForm' onSubmit={event => this.handleSubmit(event)} >
            <input type='text' ref='input' value={this.state.message} className='lobbyChatFormText' onChange={event => this.handleChange(event)} placeholder='Write a message...' />
            <input type='submit' ref='submit' className='lobbyChatFormButton' value='Send' />
        </form>

        return <div className='lobbyChat'>
            {chat}
            {messageBox}
        </div>
    }
}

export default LobbyChat
