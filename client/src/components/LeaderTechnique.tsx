import React, { Component } from 'react'
import Card from './Card'
import HoverCard from './HoverCard'

class LeaderTechnique extends Card {
    hoverCard(object): JSX.Element | null {
        return <HoverCard object={object} animations={this.props.animations} selections={this.props.selections}></HoverCard>
    }

    render() {
        const costLabel = this.props.object.subtype === 'Active' ? <div className="multicolour-line">{this.statLabel('cost')}</div> : null
        if (this.props.object) {
            return (
                <div onClick={event => this.props.selections.handleSelection(this.props.object)} className={this.styleClasses()}>
                    <div className={`cardClassColour ${this.cardClass()}`}></div>
                    {this.actionOverlay()}
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
