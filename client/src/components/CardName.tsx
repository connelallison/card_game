import React from 'react'
import TargetableEntity from './TargetableEntity'

class CardName extends TargetableEntity {
    render() {
        const styleClasses = this.outlineStatus() + ' cardName'
        const callback = event => {
            event.stopPropagation()
            this.props.selections.handleSelection(this.props.object)
        }
        return (
            <div className={styleClasses} onClick={callback}>
                {this.statLabel('cost')}
                <p>{this.props.object.name}</p>
            </div>
        )
    }
}

export default CardName
