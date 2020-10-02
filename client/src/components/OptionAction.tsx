import React from 'react'
import TargetableEntity from "./TargetableEntity";

class OptionAction extends TargetableEntity {
    render() {
        return (
            <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={`${this.outlineStatus()} card`}>
                <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
                <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
            </div>
        )
    }
}

export default OptionAction