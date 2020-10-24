abstract class GamePhase {
    parent: GamePhase
    children: GamePhase[]
    activeChild: GamePhase
    eventCache: EventCache
    ended: boolean

    constructor() {
        this.eventCache = this.newEventCache()
        this.children = []
        this.activeChild = null
        this.ended = false
    }

    cacheEvent(event: GameEvent, type: EventTypeString): void {
        this.parent.cacheEvent(event, type);
        (this.eventCache[type] as GameEvent[]).push(event)
        this.eventCache.all.push(event)
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    startChild(child: GamePhase): void {
        this.activeChild = child
        this.children.push(this.activeChild)
        this.activeChild.start()
    }

    createCard(cardID: CardIDString, owner: GamePlayer): Card {
        return new Cards[cardID](this.game(), owner)
    }

    createPersistentCard(cardID: PersistentCardIDString, owner: GamePlayer): PersistentCard {
        return this.createCard(cardID, owner) as PersistentCard
    }
    createDestroyableCard(cardID: DestroyableCardIDString, owner: GamePlayer): DestroyableCard {
        return this.createCard(cardID, owner) as DestroyableCard
    }
    createFollower(cardID: FollowerIDString, owner: GamePlayer): Follower {
        return this.createCard(cardID, owner) as Follower
    }
    createLeader(cardID: LeaderIDString, owner: GamePlayer): Leader {
        return this.createCard(cardID, owner) as Leader
    }
    createMoment(cardID: MomentIDString, owner: GamePlayer): Moment {
        return this.createCard(cardID, owner) as Moment
    }
    createCreation(cardID: CreationIDString, owner: GamePlayer): Creation {
        return this.createCard(cardID, owner) as Creation
    }
    createLeaderTechnique(cardID: LeaderTechniqueIDString, owner: GamePlayer): LeaderTechnique {
        return this.createCard(cardID, owner) as LeaderTechnique
    }
    createPassive(cardID: PassiveIDString, owner: GamePlayer): Passive {
        return this.createCard(cardID, owner) as Passive
    }
    createNamelessFollower(cardID: NamelessFollowerIDString, owner: GamePlayer): NamelessFollower {
        return this.createCard(cardID, owner) as NamelessFollower
    }
    createFamousFollower(cardID: FamousFollowerIDString, owner: GamePlayer): FamousFollower {
        return this.createCard(cardID, owner) as FamousFollower
    }
    createWorkCreation(cardID: WorkCreationIDString, owner: GamePlayer): WorkCreation {
        return this.createCard(cardID, owner) as WorkCreation
    }
    createWeaponCreation(cardID: WeaponCreationIDString, owner: GamePlayer): WeaponCreation {
        return this.createCard(cardID, owner) as WeaponCreation
    }
    createWonderCreation(cardID: WonderCreationIDString, owner: GamePlayer): WonderCreation {
        return this.createCard(cardID, owner) as WonderCreation
    }
    createTechniqueCreation(cardID: TechniqueCreationIDString, owner: GamePlayer): TechniqueCreation {
        return this.createCard(cardID, owner) as TechniqueCreation
    }


    createEffect(effectID: EffectIDString, owner: GameObject): Effect {
        return new Effects[effectID](this.game(), owner)
    }
    createStaticEffect(effectID: StaticEffectIDString, owner: GameObject): StaticEffect {
        return this.createEffect(effectID, owner) as StaticEffect
    }
    createAuraEffect(effectID: AuraEffectIDString, owner: GameObject): AuraEffect {
        return this.createEffect(effectID, owner) as AuraEffect
    }
    createTriggerEffect(effectID: TriggerEffectIDString, owner: GameObject): TriggerEffect {
        return this.createEffect(effectID, owner) as TriggerEffect
    }
    createEffectExpiry(effectID: EffectExpiryIDString, owner: GameObject): TriggerEffect {
        return this.createEffect(effectID, owner) as TriggerEffect
    }

    game(): Game {
        return this.parent.game()
    }

    currentTurn(): Turn {
        return this.game().activeChild
    }

    currentSequence(): Sequence {
        return this.currentTurn().activeChild
    }

    currentOuterPhase(): EventPhase {
        // console.log(!!this.game(), !!this.currentTurn(), !!this.currentSequence())
        return this.currentSequence().activeChild
    }

    currentBottomPhase(): EventPhase {
        return this.currentOuterPhase().deepestChild()
    }

    emit(event: TriggerTypeString, ...args: any[]): void {
        this.game().event.emit(event, ...args)
    }

    abstract start(): void

    abstract end(): void

    newEventCache(): EventCache {
        return {
            all: [],
            death: [],
            play: [],
            action: [],
            optionAction: [],
            eventAction: [],
            deathAction: [],
            // eurekaAction: [],
            attack: [],
            damage: [],
            healing: [],
            draw: [],
            enterPlay: [],
            summon: [],
            use: [],
            startOfTurn: [],
            endOfTurn: [],
            spendMoney: [],
            accrueDebt: [],
            discard: [],
            trigger: [],
            triggerAction: [],
            update: [],
        }
    }
}

export default GamePhase

import GameEvent from "./GameEvent"
import GameObject from "../gameObjects/GameObject"
import EventCache from "./EventCache"
import Game from "./Game"
import Turn from "./Turn"
import Sequence from "./Sequence"
import EventPhase from "./EventPhase"
import EventTypeString from "../stringTypes/EventTypeString"
import {
    CardIDString,
    EffectIDString,
    FollowerIDString,
    LeaderIDString,
    MomentIDString,
    CreationIDString,
    LeaderTechniqueIDString,
    PassiveIDString,
    PersistentCardIDString,
    DestroyableCardIDString,
    NamelessFollowerIDString,
    FamousFollowerIDString,
    WorkCreationIDString,
    WeaponCreationIDString,
    WonderCreationIDString,
    TechniqueCreationIDString,
    StaticEffectIDString,
    AuraEffectIDString,
    TriggerEffectIDString,
    EffectExpiryIDString,
} from "../stringTypes/DictionaryKeyString"
import GamePlayer from "../gameObjects/GamePlayer"
import Card from "../gameObjects/Card"
import Cards from "../dictionaries/Cards"
import Effect from "../gameObjects/Effect"
import Effects from "../dictionaries/Effects"
import TriggerTypeString from "../stringTypes/TriggerTypeString"
import Follower from "../gameObjects/Follower"
import Leader from "../gameObjects/Leader"
import Moment from "../gameObjects/Moment"
import Creation from "../gameObjects/Creation"
import LeaderTechnique from "../gameObjects/LeaderTechnique"
import Passive from "../gameObjects/Passive"
import PersistentCard from "../gameObjects/PersistentCard"
import DestroyableCard from "../gameObjects/DestroyableCard"
import NamelessFollower from "../gameObjects/NamelessFollower"
import FamousFollower from "../gameObjects/FamousFollower"
import WorkCreation from "../gameObjects/WorkCreation"
import WeaponCreation from "../gameObjects/WeaponCreation"
import WonderCreation from "../gameObjects/WonderCreation"
import TechniqueCreation from "../gameObjects/TechniqueCreation"
import StaticEffect from "../gameObjects/StaticEffect"
import AuraEffect from "../gameObjects/AuraEffect"
import TriggerEffect from "../gameObjects/TriggerEffect"