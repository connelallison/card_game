import React, { Component } from 'react'
import Card from './Card'
import Creation from './Creation'
import Follower from './Follower'
import Moment from './Moment'
import Passive from './Passive'
import Unknown from './Unknown'

export interface EntityProps {
    object: any
    selections: Selections
}

export interface Selections {
    selectionsEnabled: boolean
    selected: any[]
    targetSelection: TargetSelection
    handleSelection: (object: any) => void
}

export interface TargetSelection {
    text: string
    hostile: boolean
    validTargets: string[]
    highlightedTargets: string[]
}

abstract class TargetableEntity extends Component {
    props!: EntityProps
    constructor(props: EntityProps) {
        super(props)
    }

    targetType(): string {
        return this.props.selections.targetSelection
            && this.props.selections.targetSelection.highlightedTargets.includes(this.props.object.objectID)
            ? 'highlightedTarget'
            : this.props.selections.targetSelection.hostile
                ? 'hostileTarget'
                : 'nonHostileTarget'
    }

    outlineStatus(): string {
        return (
            this.props.selections.selectionsEnabled
            && this.props.selections.selected
            && this.props.selections.selected.includes(this.props.object)
        )
            ? 'isSelected'
            : this.canBeTargeted()
                ? this.targetType()
                : 'notTargetable'
    }

    canBeTargeted(): boolean {
        return this.props.selections.selectionsEnabled
            && this.props.selections.targetSelection
            && this.props.selections.targetSelection.validTargets.includes(this.props.object.objectID)
    }

    statLabel(stat: 'attack' | 'health' | 'cost' | 'charges' | 'armour'): JSX.Element | null {
        const abbreviations = {
            attack: 'A',
            health: 'H',
            cost: 'M',
            charges: 'C',
            armour: 'A',
        }
        const hiddenCriterion = (
            stat === 'armour' || stat === 'charges'
            || this.props.object.type === 'BoardSlot'
            || (this.props.object.type === 'Leader' && stat === 'attack')
            || (this.props.object.type === 'Passive')
        )
            ? this.props.object[stat] > 0
            : this.props.object[stat] !== null
        return this.props.object.hasOwnProperty(stat) && hiddenCriterion ? (
            <p className={`${stat}-label stat-label`}>{this.props.object[stat]}{abbreviations[stat]}</p>
        ) : null
    }

    abstract hoverCard(object): JSX.Element | null 

    abstract render(): JSX.Element
}

export default TargetableEntity
