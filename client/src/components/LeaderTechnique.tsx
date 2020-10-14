import React, { Component } from 'react'
import Card from './Card'

class LeaderTechnique extends Card {
    // hoverCard() {
    //     return this.props.big ? null : <LeaderTechnique big hover={false} object={this.props.object} selections={this.props.selections} />
    // }

    render() {
        const costLabel = this.props.object.subtype === 'Active' ? <div className="multicolour-line">{this.statLabel('cost')}</div> : null
        if (this.props.object) {
            return (
                <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
                    <div className={`cardClassColour ${this.cardClass()}`}></div>
                    <p className={`card-name ${this.nameLength()}`}>{this.props.object.name}</p>
                    {/* {this.handInfo()} */}
                    {/* <p className={`card-text ${this.textLength()}`}>{this.props.object.text}</p> */}
                    {this.boldedText()}
                    {costLabel}
                    {this.addedText()}
                    {this.tooltips()}
                    {this.relatedCard()}
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
