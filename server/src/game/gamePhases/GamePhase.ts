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


    createEnchantment(enchantmentID: EnchantmentIDString, owner: GameObject): Enchantment {
        return new Enchantments[enchantmentID](this.game(), owner)
    }
    createStaticEnchantment(enchantmentID: StaticEnchantmentIDString, owner: GameObject): StaticEnchantment {
        return this.createEnchantment(enchantmentID, owner) as StaticEnchantment
    }
    createAuraEnchantment(enchantmentID: AuraEnchantmentIDString, owner: GameObject): AuraEnchantment {
        return this.createEnchantment(enchantmentID, owner) as AuraEnchantment
    }
    createTriggerEnchantment(enchantmentID: TriggerEnchantmentIDString, owner: GameObject): TriggerEnchantment {
        return this.createEnchantment(enchantmentID, owner) as TriggerEnchantment
    }
    createEnchantmentExpiry(enchantmentID: EnchantmentExpiryIDString, owner: GameObject): TriggerEnchantment {
        return this.createEnchantment(enchantmentID, owner) as TriggerEnchantment
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
            trigger: [],
            triggerAction: [],
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
    EnchantmentIDString,
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
    StaticEnchantmentIDString,
    AuraEnchantmentIDString,
    TriggerEnchantmentIDString,
    EnchantmentExpiryIDString,
} from "../stringTypes/DictionaryKeyString"
import GamePlayer from "../gameObjects/GamePlayer"
import Card from "../gameObjects/Card"
import Cards from "../dictionaries/Cards"
import Enchantment from "../gameObjects/Enchantment"
import Enchantments from "../dictionaries/Enchantments"
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
import StaticEnchantment from "../gameObjects/StaticEnchantment"
import AuraEnchantment from "../gameObjects/AuraEnchantment"
import TriggerEnchantment from "../gameObjects/TriggerEnchantment"