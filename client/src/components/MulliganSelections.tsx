import React, { Component } from 'react'
import EntityContainer, { EntityContainerProps } from './EntityContainer'
import { BigCard } from './HoverCard'

interface MulliganSelectionsProps extends EntityContainerProps {
    announceMulligan: () => void
}

class MulliganSelections extends EntityContainer {
    props!: MulliganSelectionsProps

    render() {
        const mulliganChoices = (this.props.contents).map(mulliganChoice =>
            <BigCard key={mulliganChoice.objectID} mulligan={this.props.selections.selected.includes(mulliganChoice)} object={mulliganChoice} animations={this.props.animations} selections={this.props.selections} />
        )

        return (
            <div className="mulliganSelections">
                <div className='big cardList mulliganChoices'>
                    {mulliganChoices}
                </div>
                <div className='mulliganButtonDiv'>
                    <button onClick={this.props.announceMulligan} >Submit</button>
                </div>
            </div>
        )
    }
}

export default MulliganSelections