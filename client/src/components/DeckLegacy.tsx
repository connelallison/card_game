import React from 'react'
import EntityContainer from './EntityContainer'
import NameList from './NameList'

abstract class DeckLegacy extends EntityContainer {
    state: { nameListHidden: boolean }

    constructor(props) {
        super(props)
        this.state = {
            nameListHidden: true,
        }
    }

    styleClasses(): string {
        return this.contentsSelectable()
            ? 'nonHostileTarget'
            : 'notTargetable'
    }

    contentsSelectable(): boolean {
        return this.props.contents.some(object =>
            this.props.selections.selectionsEnabled
            && this.props.selections.targetSelection
            && this.props.selections.targetSelection.validTargets.includes(object.objectID)
        )
    }

    toggleNameList(): void {
        if (this.props.contents.length > 0) this.setState({ nameListHidden: !this.state.nameListHidden })
        else this.setState({ nameListHidden: true })
    }

    nameList() {
        return this.state.nameListHidden
            ? null
            : <NameList mine={this.props.mine} contents={this.props.contents} selections={this.props.selections} />
    }
}

export default DeckLegacy
