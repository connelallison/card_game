import React, { Component } from 'react'
import TargetableEntity from './TargetableEntity'

class LeaderTechnique extends TargetableEntity {
    render() {
        if (this.props.object) {
            const styleClasses = this.outlineStatus() + " leaderTechnique card"
            return (
                <div onClick={event => this.props.handleSelection(this.props.object)} className={styleClasses}>
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
