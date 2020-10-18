import React, { Component } from 'react'

class DeckSelection extends Component {
  render() {
    const deckOptions = this.props.decks
      ? Object.values(this.props.decks).map(deck => <option key={deck.id} value={deck.id}>{deck.name}: {deck.class}</option>)
      : <option disabled value='noDecks' >No decks</option>

    const defaultDeck = this.props.deckID
      ? this.props.deckID
      : 'noDecks'

    return (
      <form>
        <label>
          Select a deck:
        <select id='select-deck' name='deck' value={defaultDeck} onChange={event => this.props.updateDeck(event.target.value)}>
            {deckOptions}
          </select>
        </label>
      </form >
    )
  }
}

export default DeckSelection
