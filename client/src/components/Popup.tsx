import React, { Component } from "react";

export interface PopupProps {
    header: string
    message: string[]
    dismiss: () => void
}

class Popup extends Component {
    props!: PopupProps

    render() {
        const welcome = this.props.header === 'Welcome to the History of Everything!'
        const gameEnded = this.props.header === 'Game ended'

        const lines = !welcome ? this.props.message.map(line => <p>{line}</p>) : <div className='welcomeMessage'>

            <h3>What is this?</h3>
            <p><em><strong>The History of Everything</strong></em> is a digital Collectible Card Game, similar to <em>Hearthstone</em> or <em>Magic: The Gathering</em>. You build a deck of cards, representing characters and things from all of history, and use them to defeat other players in a game.</p>
            <p> This is a demo version of the game, with a prototype browser-based client. The final version will be a normal game that you download from Steam, with all the nice visuals you would expect from a card game.</p>

            <h3>How do I play?</h3>
            <p>If you've played this sort of game before, you may be able to jump right in and work it out. There are lots of tooltips, so if you're unsure what something means, just hover over the card and you should see an explanation on the left.</p>
            <p>If not, or if you'd like to read up first, then take a look at the <strong>How to play</strong> section at the top. When you're ready you can challenge TestBot, or another player, to a game.</p>

            <h3>Can I make my own deck?</h3>
            <p>Soon! For now, though, there are several pre-built decks that showcase some of the interesting cards and mechanics the game has to offer. You can find about more about them, including a full card list and some tips on how to pilot them, in the <strong>Decks</strong> section at the top.</p>
            <p>Four of the eight classes have been unveiled so far - <strong>Economy</strong>, <strong>Infamy</strong>, <strong>Learning</strong>, and <strong>The People</strong> - each with two or three decks to try. More classes and decks will be added in the next couple weeks, so check back often!</p>

            <h3>Help - I can't see my hand!</h3>
            <p>This prototype version is designed to be played at 1080p in fullscreen. If you are on a laptop with a small screen, you may need to zoom out. <strong className='fullscreenWarning'>Press F11 to go into fullscreen mode</strong>, or your cards will be off the bottom of the screen!</p>
        </div>

        const buttonText = welcome ? 'Enter Lobby' : gameEnded ? 'Return to lobby' : 'Dismiss'

        return (
            <div className={welcome ? 'welcome popup' : 'popup'}>
                <h2>{this.props.header}</h2>
                {lines}
                <br />
                <span className='challengeButtons'>
                    <button onClick={this.props.dismiss}>{buttonText}</button>
                </span>
            </div>
        )
    }
}

export default Popup