import React, { Component } from 'react'

class DeckSelection extends Component {
  render() {
    return (
      <form>
        <label>
          Select a deck:  
        <select id='select-deck' name='deck' value={this.props.deckID} onChange={event => this.props.updateDeck(event.target.value)}>
            <option value='KnightDeck' >The People - Revolution</option>
            <option value='CivilDisobedience' >The People - Civil Disobedience</option>
            {/* <option value='OrcDeck' >Orc Deck</option> */}
            <option value='ThinkTank' >Learning - Think Tank</option>
            <option value='ExponentialCancer' >Learning - Harsh Medicine</option>
          </select>
        </label>
      </form>
    )
  }
}

export default DeckSelection
