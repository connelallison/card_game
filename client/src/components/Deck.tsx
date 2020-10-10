import React from 'react'
import DeckLegacy from './DeckLegacy'

class Deck extends DeckLegacy {
    render() {
        return (
            <div className={`${this.styleClasses()} zone deck`} onClick={event => this.toggleNameList()}>
                <p>Deck</p>
                <p>{this.props.contents.length} cards</p>
                <br />
                <p>{this.props.contents.length === 0 ? '' : this.state.nameListHidden ? '(Click to view)' : '(Click to hide)'}</p>
                {this.nameList()}
            </div>
        )
    }
}

export default Deck