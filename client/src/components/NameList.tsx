import React from 'react'
import CardName from './CardName'
import EntityContainer from './EntityContainer'

class NameList extends EntityContainer {
    render() {
        if (this.props.contents.length > 0) {
            const nameList = this.props.contents.map(object =>
                <CardName object={object} selected={this.props.selected} targetSelection={this.props.targetSelection} handleSelection={this.props.handleSelection} />
            )
            return (
                <div className='nameList'>
                    {nameList}
                </div>
            )
        } else {
            return <></>
        }
    }
}

export default NameList
