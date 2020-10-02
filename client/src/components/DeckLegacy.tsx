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
            : <NameList mine={this.props.mine} contents={this.props.contents} selections={this.props.selections}/>
    }
}

export default DeckLegacy
