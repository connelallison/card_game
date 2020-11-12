import React, { Component } from 'react'
import DisplayName from './DisplayName'

class NavBar extends Component {
    props!: {
        offscreen?: boolean
        displayName: string
        updateName: (name: string) => void
        view: 'lobby' | 'decks' | 'howTo' | 'game'
        updateView: (view: 'lobby' | 'decks' | 'howTo') => void
    }

    render() {
        return (
            <div className={`topBar navBar ${this.props.offscreen ? 'offscreen' : ''}`}>

                {/* <p className={`game-status navButton`}><em> <a href="https://www.kickstarter.com/projects/historyofeverything/the-history-of-everything">The History of Everything</a></em></p> */}
                <p className={`game-status`}><em>The History of Everything</em></p>
                <p className={`game-status navButton ${this.props.view === 'lobby' ? 'selected' : ''}`} onClick={() => this.props.updateView('lobby')} >Lobby</p>
                <p className={`game-status navButton ${this.props.view === 'decks' ? 'selected' : ''}`} onClick={() => this.props.updateView('decks')} >Decks</p>
                <p className={`game-status navButton ${this.props.view === 'howTo' ? 'selected' : ''}`} onClick={() => this.props.updateView('howTo')} >How to play</p>
                <DisplayName displayName={this.props.displayName} handleSubmit={this.props.updateName} />
                {/* <p className='game-status navButton support'><a href="https://www.kickstarter.com/projects/historyofeverything/the-history-of-everything">Support the game</a></p> */}
            </div>
        )
    }
}

export default NavBar