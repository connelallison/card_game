import React, { Component } from 'react'

class LeaderTechnique extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleClick = this.handleClick.bind(this);
        this.canBeTargeted = this.canBeTargeted.bind(this);
    }

    canBeTargeted() {
        return this.props.selected !== null && this.props.selected.validTargets !== null && this.props.selected.validTargets.includes(this.props.object.objectID)
    }

    handleClick() {
        if (this.props.selected === this.props.object) {
            this.props.interactivity.clearSelected();
        } else if (this.props.selected === null && this.props.object.canBeSelected) {
            if (this.props.object.requiresTarget) {
                this.props.interactivity.chooseSelected(this.props.object)
            } else {
                this.props.interactivity.chooseSelectedNoTarget(this.props.object)
            }
        } else if (this.props.selected !== null && this.props.selected !== this.props.object && this.canBeTargeted()) {
            this.props.interactivity.chooseTarget(this.props.object)
        } else {
            this.props.interactivity.invalidMove()
        }
    }

    render() {
        if (this.props.object) {
            const textLength = this.props.object.staticCardText.length > 70 ? 'text-long' :
                this.props.object.staticCardText.length > 35 ? 'text-medium' : 'text-short'
            const nameLength = this.props.object.name.length > 22 ? 'name-long' : 
                               this.props.object.name.length > 17 ? 'name-medium' : 'name-short'   
            const outlineStatus = this.props.selected === this.props.object ? "isSelected" :
                this.props.selected !== null && this.props.selected !== this.props.object && this.canBeTargeted() ? "canBeTargeted" :
                    this.props.selected === null && this.props.object.canBeSelected ? "canBeSelected" : ""
            const styleClasses = outlineStatus + " leaderTechnique card"
            return (
                <div onClick={this.handleClick} className={styleClasses}>
                    <p className={`card-name ${nameLength}`}>{this.props.object.name}</p>
                    <p className={`card-text ${textLength}`}>{this.props.object.staticCardText}</p>
                    <div className="multicolour-line">
                        <p className='cost-label stat-label'>{this.props.object.cost}M</p>
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
