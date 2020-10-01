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

    toggleNameList() {
        if (this.props.contents.length > 0) this.setState({ nameListHidden: !this.state.nameListHidden })
        else this.setState({ nameListHidden: true })
    }

    nameList() {
        return this.state.nameListHidden
            ? null
            : <NameList mine={this.props.mine} selected={this.props.selected} contents={this.props.contents} targetSelection={this.props.targetSelection} handleSelection={this.props.handleSelection} />
    }
}

export default DeckLegacy
