import React from 'react'
import Highlighter from 'react-highlight-words'
import AddedText from './AddedText'
import TargetableEntity, { Animations, EntityProps, Selections } from './TargetableEntity'

export interface CardProps extends EntityProps {
    mine?: boolean
    object: any
    selections: Selections
    animations: Animations
    big?: boolean
    hover?: boolean
    relatedCard?: boolean
    playCard?: boolean
    mulligan?: boolean
    zone?: boolean
}

abstract class Card extends TargetableEntity {
    props!: CardProps
    constructor(props: CardProps) {
        super(props)
    }

    isBig(): string {
        return !!this.props.big ? 'big' : ''
    }

    isHover(): string {
        return !!this.props.hover ? 'hoverCard' : ''
    }

    isRelatedCard(): string {
        return !!this.props.relatedCard ? 'relatedCard' : ''
    }

    isPlayCard(): string {
        return !this.props.playCard ? '' : 'playCard'
    }

    isMulliganCard(): string {
        return !!this.props.mulligan ? 'mulliganCard' : ''
    }

    isCombat(): string {
        return !!this.props.animations.combatCards[this.props.object.objectID] ? 'combat' : ''
    }

    isDying(): string {
        return !!this.props.animations.deathCards[this.props.object.objectID] && !!this.props.animations.actionCards[this.props.object.objectID] ? 'dying' : ''
    }

    hoverCard(object): JSX.Element | null { return null }

    fortuneOverlay(): JSX.Element | null {
        return this.props.object.fortune && (this.props.object.zone === 'board' || this.props.object.zone === 'leaderZone' || this.props.object.zone === 'creationZone')
            ? (<div className='fortune overlay'></div>)
            : null
    }

    guardOverlay(): JSX.Element | null {
        return this.props.object.guard && this.props.object.zone === 'board' || this.props.object.zone === 'leaderZone'
            ? (<div className='guard overlay'></div>)
            : null
    }


    damageOverlay(): JSX.Element | null {
        const damage = this.props.animations.damageCards[this.props.object.objectID]
        return !!damage
            ? <div
                key={damage.key}
                className={`damage overlay ${damage.number === 0 ? 'noDamage' : ''}`}>
                <p className={`${damage.rot ? 'rotText' : 'damageText'} overlayText`}>-{damage.number}</p>
            </div>
            : null
    }

    healingOverlay(): JSX.Element | null {
        const healing = this.props.animations.healingCards[this.props.object.objectID]
        return !!healing && healing.number !== 0
            ? <div key={healing.key} className='healing overlay'>
                <p className={`${healing.nourish ? 'nourishText' : 'healingText'} overlayText`}>+{healing.number}</p>
            </div>
            : null
    }

    deathOverlay(): JSX.Element | null {
        return !!this.props.animations.deathCards[this.props.object.objectID]
            ? <div key={this.props.animations.deathCards[this.props.object.objectID].key} className='death overlay'></div>
            : null
    }

    actionOverlay(): JSX.Element | null {
        return !!this.props.animations.actionCards[this.props.object.objectID]
            ? <div key={this.props.animations.actionCards[this.props.object.objectID].key} className='action overlay'></div>
            : null
    }

    mulliganOverlay(): JSX.Element | null {
        return this.props.mulligan
            ? <div className='mulligan overlay'>
                <p className='mulliganText overlayText'>REPLACED</p>
            </div>
            : null
    }

    textLength(): string {
        return `${this.isBig()} ${this.props.object.text.length > 70 ? 'text-long' : this.props.object.text.length > 35 ? 'text-medium' : 'text-short'}`
    }

    nameLength(): string {
        return `${this.isBig()} ${this.props.object.name.length > 22 ? 'name-long' : this.props.object.name.length > 16 ? 'name-medium' : 'name-short'}`
    }

    styleClasses(): string {
        return `${this.outlineStatus()} 
                ${this.isBig()} 
                ${this.isHover()} 
                ${this.isRelatedCard()} 
                ${this.isPlayCard()} 
                ${this.isCombat()}
                ${this.isDying()}
                ${this.isMulliganCard()}
                ${this.props.zone ? 'zone' : 'card'} 
                ${this.props.object.type || ''}`
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
        return (this.props.object && this.props.object.addedText && this.props.object.addedText.length > 0) ? <AddedText objectID={this.props.object.objectID} contents={this.props.object.addedText} /> : null
    }

    tooltips() {
        return (this.props.object && this.props.object.tooltips && this.props.object.tooltips.length > 0) ? <AddedText tooltip objectID={this.props.object.objectID} contents={this.props.object.tooltips} /> : null
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
                    'Starter', 'Passive', 'Successor', 'Immune', 'Rot',
                    'Nourish', 'Collateral', 'Debt', 'Lethal', 'Repeatable']}
                highlightTag='span'
                textToHighlight={this.props.object.text}
            />
            : null
        return <p className={`card-text ${this.textLength()}`}>{boldedText}</p>
    }

    handInfo(): JSX.Element | null {
        return (this.props.hover || this.props.big || this.props.relatedCard || this.props.playCard || this.props.object.zone === 'hand') ? (
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
