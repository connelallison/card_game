import React, { Component } from 'react'
import Card from './Card'
import TargetableEntity from './TargetableEntity'

class LeaderTechnique extends Card {
    bigCard() {
        return this.props.big ? null : <LeaderTechnique big object={this.props.object} selections={this.props.selections} /> 
    }

    render() {
        if (this.props.object) {
            return (
                <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
                    <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
                    <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p>
                    <div className="multicolour-line">
                        {this.statLabel('cost')}
                    </div>
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }

}

export default LeaderTechnique
