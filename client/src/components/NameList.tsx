import React from 'react'
import { CardObject } from '../structs/DeckObject'
import CardName from './CardName'
import EntityContainer, { EntityContainerProps } from './EntityContainer'

interface NameListProps extends EntityContainerProps {
    deckView?: boolean
}

class NameList extends EntityContainer {
    props!: NameListProps

    render() {
        if (this.props.contents.length > 0) {
            // const cards = this.props.contents.sort((first, second) => this.sortCards(first, second) ? 1 : -1)
            const nameList = this.props.contents.map((object, index) =>
                <CardName object={object} key={`${object.objectID}:${index}`} animations={this.props.animations} selections={this.props.selections} />
            )
            return (
                <div className={`nameList ${this.props.deckView ? 'deckViewCards' : ''}`}>
                    {nameList}
                </div>
            )
        } else {
            return <></>
        }
    }
}

export default NameList
