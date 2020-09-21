import React, { Component } from 'react'
import OptionAction from './OptionAction'
import { TargetSelection } from './TargetableEntity'

interface OptionSelectionsProps {
    // mine: boolean
    contents: any
    targetSelection: TargetSelection
    handleSelection: (object: any) => void
}

class OptionSelections extends Component {
    props!: OptionSelectionsProps

    constructor(props: OptionSelectionsProps) {
        super(props)
    }

    render() {
        let optionActions
        if (this.props.contents) {
            optionActions = (this.props.contents as any[]).map(optionAction =>
                <OptionAction object={optionAction} targetSelection={this.props.targetSelection} handleSelection={this.props.handleSelection} />
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