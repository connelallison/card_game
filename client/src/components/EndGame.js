import React, { Component } from 'react'

class EndGame extends Component {
    render() {
        return (
            <div className='game-status'>
                <p className='lowerMargin'>Current opponent: {this.props.opponentName}</p>
                <button onClick={this.props.endGame}>End Game</button>
            </div>
        )
    }
}

export default EndGame
