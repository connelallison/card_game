import GameObject from "../gameObjects/GameObject"
import EventCache from "./EventCache"
import GameEvent from "../gameEvents/GameEvent"
import Game from "./Game"
import Turn from "./Turn"
import Sequence from "./Sequence"
import EventPhase from "./EventPhase"
import TriggerTypeString from "../stringTypes/TriggerTypeString"
import EventTypeString from "../stringTypes/EventTypeString"
import CardIDString from "../stringTypes/CardIDString"
import GamePlayer from "../gameObjects/GamePlayer"
import Cards from "../dictionaries/Cards"
import Card from "../gameObjects/Card"
import EnchantmentIDString from "../stringTypes/EnchantmentIDString"
import Enchantment from "../gameObjects/Enchantment"
import Enchantments from "../dictionaries/Enchantments"

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
        return new Cards[cardID](this.game(), owner, 'setAsideZone')
    }

    createEnchantment(enchantmentID: EnchantmentIDString, owner: GameObject, values?): Enchantment {
        return new Enchantments[enchantmentID](this.game(), owner, values)
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