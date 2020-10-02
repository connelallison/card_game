import React, { Component } from 'react'
import EntityContainer from './EntityContainer'
import OptionAction from './OptionAction'

class OptionSelections extends EntityContainer {
    render() {
        let optionActions
        if (this.props.contents) {
            optionActions = (this.props.contents).map(optionAction =>
                <OptionAction object={optionAction} selections={this.props.selections} />
            )
        } else {
            optionActions = null
        }

        return (
            <div className="optionSelections">
                <div className='cardList optionActions'>
                    {optionActions}
                </div>
            </div>
        )
    }
}

export default OptionSelections