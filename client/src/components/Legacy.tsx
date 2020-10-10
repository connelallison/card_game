import React from 'react'
import DeckLegacy from './DeckLegacy'

class Legacy extends DeckLegacy {
    render() {
        return (
            <div className={`${this.styleClasses()} zone legacy`} onClick={event => this.toggleNameList()}>
                <p>Legacy</p>
                <p>{this.props.contents.length} cards</p>
                <br />
                <p>{this.props.contents.length === 0 ? '' : this.state.nameListHidden ? '(Click to view)' : '(Click to hide)'}</p>
                {this.nameList()}
            </div>
        )
    }
}

export default Legacy
