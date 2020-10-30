import React, { Component } from 'react'
import { Decks } from '../structs/DeckObject'

interface HowToSectionListProps {
    decks: Decks,
    deckID: string,
    updateDeck: (deckID: string) => void,
}

class HowToSectionList extends Component {
    props!: HowToSectionListProps

    constructor(props: HowToSectionListProps) {
        super(props)
    }

    render() {
        const deckRows = Object.values(this.props.decks).map(deck => <tr key={deck.id} className='sectionListRow' onClick={() => this.props.updateDeck(deck.id)} ><td className={`notTargetable`}>{deck.name} - <em>{deck.class}</em></td></tr>)

        return <div className='decksList'>
            <table className='decksListTable'>
                <thead><tr><td>Decks</td></tr></thead>
                <tbody>
                    {deckRows}
                </tbody>
            </table>
        </div>
    }
}

export default HowToSectionList