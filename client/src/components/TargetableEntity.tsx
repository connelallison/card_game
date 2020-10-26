import React, { Component } from 'react'

export interface EntityProps {
    object: any
    selections: Selections
    animations: Animations
}

export interface Selections {
    selectionsEnabled: boolean
    selected: any[]
    gameObjects: { [index: string]: any }
    targetSelection: TargetSelection
    handleSelection: (object: any) => void
}

export interface Animations {
    combatCards: { [index: string]: AnimationObject }
    damageCards: { [index: string]: AnimationObject }
    healingCards: { [index: string]: AnimationObject }
    deathCards: { [index: string]: AnimationObject }
    actionCards: { [index: string]: AnimationObject }
}

export interface AnimationObject {
    objectID: string
    timeout: NodeJS.Timeout
    number?: number
    key?: number
    rot?: boolean
    nourish?: boolean
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
            ? 'highlightedTarget '
            : this.props.selections.targetSelection.hostile
                ? 'hostileTarget '
                : 'nonHostileTarget '
    }

    outlineStatus(): string {
        return (
            this.props.selections.selectionsEnabled
            && this.props.selections.selected
            && this.props.selections.selected.some(selected => selected.objectID === this.props.object.objectID)
        )
            ? 'isSelected '
            : this.canBeTargeted()
                ? this.targetType()
                : 'notTargetable '
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

        const sign = this.props.object[stat] < 0 ? '-' : ''
        const integer = Math.floor(Math.abs(this.props.object[stat])) 
        const decimal = Math.round(Math.abs((this.props.object[stat] % 1)) * 10)
        // fix decimals
        const decimalSpan = decimal > 0 ? <span className='decimal'>.{decimal}</span> : null
        const spanClass = stat === 'health' && this.props.object.damaged
            ? 'damaged'
            : (
                (stat === 'cost' && this.props.object.discounted)
                || (stat === 'health' && this.props.object.healthBuffed)
                || (stat === 'attack' && this.props.object.attackBuffed)
            )
                ? 'buffed'
                : ''
        // const numberSpan = <span className={`statNumberSpan ${spanClass}`} >{integer}{decimalSpan}</span>
        return this.props.object.hasOwnProperty(stat) && hiddenCriterion
            ? <p className={`${stat}-label stat-label ${spanClass}`}>{sign}{integer}{decimalSpan}{abbreviations[stat]}</p>
            : null
    }

    abstract hoverCard(object): JSX.Element | null

    abstract render(): JSX.Element
}

export default TargetableEntity
