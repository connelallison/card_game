import React, { Component } from 'react'

export interface EntityProps {
    object: any
    selections: Selections
    animations: Animations
    forceHighlight?: 'isSelected' | 'nonHostileTarget' | 'hostileTarget' | 'highlightedTarget'
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
        if (this.props.forceHighlight) return this.props.forceHighlight
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
        const decimal = Math.round((Math.abs(this.props.object[stat]) - integer) * 10)
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
        let maxHealth: JSX.Element | null = null
        if (stat === 'health' && (this.props.object.type === 'Leader' || this.props.object.type === 'Follower')) {
            const currentHealthInteger = Math.floor(this.props.object.health)
            const currentHealthDecimal = Math.round((Math.abs(this.props.object.health) - currentHealthInteger) * 10)
            const currentHealthDecimalSpan = currentHealthDecimal > 0 ? <span className='decimal'>.{currentHealthDecimal}</span> : null
            const maxHealthInteger = Math.floor(this.props.object.maxHealth)
            const maxHealthDecimal = Math.round((Math.abs(this.props.object.maxHealth) - maxHealthInteger) * 10)
            const maxHealthDecimalSpan = maxHealthDecimal > 0 ? <span className='decimal'>.{maxHealthDecimal}</span> : null
            maxHealth = (
                <p className={`health-label stat-label max-health-label`}>
                    {currentHealthInteger}
                    {currentHealthDecimalSpan}
            /
                    {maxHealthInteger}
                    {maxHealthDecimalSpan}
            H
                </p>
            )
        }
        return this.props.object.hasOwnProperty(stat) && hiddenCriterion
            ? <span className={`${stat}-label stat-label ${spanClass}`}>{sign}{integer}{decimalSpan}{abbreviations[stat]}{maxHealth}</span>
            : null
    }

    abstract hoverCard(object): JSX.Element | null

    abstract render(): JSX.Element
}

export default TargetableEntity
