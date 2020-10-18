import React from 'react'
import Highlighter from 'react-highlight-words'
import AddedText from './AddedText'
import TargetableEntity, { EntityProps, Selections } from './TargetableEntity'

interface CardProps extends EntityProps {
    object: any
    selections: Selections
    big?: boolean
    hover?: boolean
    relatedCard?: boolean
    zone?: boolean
}

abstract class Card extends TargetableEntity {
    props!: CardProps
    constructor(props: CardProps) {
        super(props)
    }

    isBig(): string {
        return this.props.big ? 'big' : ''
    }

    isHover(): string {
        return this.props.hover ? 'hoverCard' : ''
    }

    isRelatedCard(): string {
        return this.props.relatedCard ? 'relatedCard' : ''
    }

    hoverCard(object): JSX.Element | null { return null }

    fortuneOverlay(): JSX.Element | null {
        return this.props.object.fortune && this.props.object.zone === 'board' || this.props.object.zone === 'leaderZone' ? (
            <div className='fortuneOverlay'></div>
        ) : null
    }

    guardOverlay(): JSX.Element | null {
        return this.props.object.guard && this.props.object.zone === 'board' || this.props.object.zone === 'leaderZone' ? (
            <div className='guardOverlay'></div>
        ) : null
    }

    textLength(): string {
        return `${this.isBig()} ${this.props.object.text.length > 70 ? 'text-long' : this.props.object.text.length > 35 ? 'text-medium' : 'text-short'}`
    }

    nameLength(): string {
        return `${this.isBig()} ${this.props.object.name.length > 22 ? 'name-long' : this.props.object.name.length > 16 ? 'name-medium' : 'name-short'}`
    }

    styleClasses(): string {
        return `${this.outlineStatus()} ${this.isBig()} ${this.isHover()} ${this.isRelatedCard()} ${this.props.zone ? 'zone' : 'card'} ${this.props.object.type || ''}`
    }

    cardClass(): string {
        if (!this.props.object.classes) return ''
        switch (this.props.object.classes[0]) {
            case 'All':
                return 'allClasses'
            case 'Arms':
                return 'arms'
            case 'Art':
                return 'art'
            case 'Economy':
                return 'economy'
            case 'Empire':
                return 'empire'
            case 'Faith':
                return 'faith'
            case 'Infamy':
                return 'infamy'
            case 'Learning':
                return 'learning'
            case 'The People':
                return 'thePeople'
            default:
                return ''
        }
    }

    addedText() {
        return (this.props.object && this.props.object.addedText && this.props.object.addedText.length > 0) ? <AddedText contents={this.props.object.addedText} /> : null
    }

    tooltips() {
        return (this.props.object && this.props.object.tooltips && this.props.object.tooltips.length > 0) ? <AddedText tooltip contents={this.props.object.tooltips} /> : null
    }

    relatedCard() {
        return (this.props.object && this.props.object.relatedCard) ? this.hoverCard(this.props.object.relatedCard) : null
    }

    boldedText() {
        const boldedText = this.props.object.text.length > 0
            ? <Highlighter
                className='boldedText'
                caseSensitive
                highlightClassName='keyword'
                searchWords={['Guard', 'Fortune', 'Fervour', 'Rent', 'Passionate', 
                            'Snipe', 'Pillage', 'Action', 'Event', 'Option', 
                            'Eureka', 'Income', 'Growth', 'Bloodthirst', 'Mob', 
                            'Rush', 'Death', 'Legacy', 'Hand', 'Deck', 
                            'Starter', 'Passive', 'Successor']}
                highlightTag='span'
                textToHighlight={this.props.object.text}
            />
            : null
        return <p className={`card-text ${this.textLength()}`}>{boldedText}</p>
    }

    handInfo(): JSX.Element | null {
        return (this.props.hover || this.props.object.zone === 'hand') ? (
            <div className="multicolour-line text-medium">
                {this.statLabel('cost')}
                <p>{this.props.object.subtype}</p>
                {/* <p>{this.props.object.subtype} {this.props.object.type}</p> */}
                {this.props.object.subtype === 'Nameless' ? this.statLabel('charges') : null}
            </div>
        ) : null
    }
}

export default Card
