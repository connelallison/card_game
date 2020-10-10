import React from 'react'
import Card from './Card';

class OptionAction extends Card {
    render() {
        return (
            <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
                <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
                <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
            </div>
        )
    }
}

export default OptionAction