import React, { Component } from 'react'
import { DeckObject, Decks } from '../structs/DeckObject'

class DeckSelection extends Component {
  props!: {
    decks: Decks
    deckID: string
    updateDeck: (deckID: string) => void
    testBot?: boolean
  }

  render() {
    const deckOptions = [<option value='random' >Random deck</option>]

    if (this.props.decks) {
      deckOptions.push(...Object.values(this.props.decks).map(deck => <option key={deck.id} value={deck.id}>{deck.name}: {deck.class}</option>))
    }

    const defaultDeck = this.props.deckID || 'random'

    return (
      <form>
        <label>
          {this.props.testBot ? 'Select a deck for TestBot' : 'Select a deck:'}
        <select id='select-deck' name='deck' value={defaultDeck} onChange={event => this.props.updateDeck(event.target.value)}>
            {deckOptions}
          </select>
        </label>
      </form >
    )
  }
}

export default DeckSelection
