import React, { Component } from 'react'

class EndGame extends Component {
    render() {
        return (
            <div className='game-status'>
                <p className='lowerMargin'>Your opponent: {this.props.opponentName}</p>
                <button onClick={this.props.endGame}>Concede</button>
            </div>
        )
    }
}

export default EndGame
