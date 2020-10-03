import React from 'react'
import TargetableEntity, { EntityProps, Selections } from './TargetableEntity'

interface CardProps extends EntityProps {
    object: any
    selections: Selections
    big: boolean
}

abstract class Card extends TargetableEntity {
    props!: CardProps
    constructor(props: CardProps) {
        super(props)
    }

    bigness(): string { 
        return this.props.big ? 'big' : ''
    }

    bigCard(): JSX.Element | null { 
        return null
    }

    textLength(): string {
        return `${this.bigness()} ${this.props.object.text.length > 70 ? 'text-long' : this.props.object.text.length > 35 ? 'text-medium' : 'text-short'}`
    }

    nameLength(): string {
        return `${this.bigness()} ${this.props.object.name.length > 22 ? 'name-long' : this.props.object.name.length > 17 ? 'name-medium' : 'name-short'}`
    }

    styleClasses(): string {
        return `${this.outlineStatus()} ${this.bigness()} card ${this.props.object.type || ''}`
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
}

export default Card
