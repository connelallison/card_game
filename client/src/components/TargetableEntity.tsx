import React, { Component } from 'react'

interface EntityProps {
    selected: any[]
    object: any
    targetSelection: TargetSelection
    handleSelection: (object: any) => void
}

export interface TargetSelection {
    text: string
    hostile: boolean
    validTargets: string[]
}

abstract class TargetableEntity extends Component {
    props!: EntityProps
    constructor(props: EntityProps) {
        super(props)
    }

    textLength(): string {
        return this.props.object.text.length > 70 ? 'text-long' : this.props.object.text.length > 35 ? 'text-medium' : 'text-short'
    }

    nameLength(): string {
        return this.props.object.name.length > 22 ? 'name-long' : this.props.object.name.length > 17 ? 'name-medium' : 'name-short'
    }

    targetType(): string {
        return this.props.targetSelection && this.props.targetSelection.hostile ? 'hostileTarget' : 'nonHostileTarget'
    }

    outlineStatus(): string {
        return this.props.selected && this.props.selected.includes(this.props.object) ? 'isSelected' : this.canBeTargeted() ? this.targetType() : ''
    }

    canBeTargeted(): boolean {
        return this.props.targetSelection && this.props.targetSelection.validTargets.includes(this.props.object.objectID)
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
        )
            ? this.props.object[stat] > 0
            : this.props.object[stat] !== null
        return this.props.object.hasOwnProperty(stat) && hiddenCriterion ? (
            <p className={`${stat}-label stat-label`}>{this.props.object[stat]}{abbreviations[stat]}</p>
        ) : null
    }

    handInfo(): JSX.Element | null {
        return this.props.object.zone === 'hand' ? (
            <div className="multicolour-line text-medium">
                {this.statLabel('cost')}
                <p>{this.props.object.subtype} {this.props.object.type}</p>
                {this.props.object.subtype === 'Nameless' ? this.statLabel('charges') : null}
            </div>
        ) : null
    }

    abstract render(): JSX.Element
}

export default TargetableEntity
