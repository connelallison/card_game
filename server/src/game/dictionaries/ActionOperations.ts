const ActionOperations = {
    damage: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { damage?: number, split?: boolean, numberMap?: TargetToNumberMapString, scaling?: number, rot?: boolean }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ?? false
        const rot = values.rot ?? source.effectOwner().flags.rot ?? false
        const scaling = values.scaling ?? 1
        const damage = (values.damage ?? 0) <= 0 ? 0 : split ? source.truncate(values.damage / targets.length) : values.damage
        if (targets.length === 1) {
            const relativeDamage = values.numberMap ? (TargetToNumberMaps[values.numberMap] as TargetToNumberMap)(targets[0]) * scaling : 0
            const damageEvent = new DamageEvent(source.game, {
                objectSource: source,
                charSource: source.charOwner(),
                target: targets[0],
                damage: damage + relativeDamage,
                split,
                rot,
            })
            let collateralDamageEvents
            if (source.flags.collateral && targets[0] instanceof Follower) {
                collateralDamageEvents = [damageEvent, ...targets[0].targetDomains('adjacentFollowers').map(follower => {
                    const relativeDamage = values.numberMap ? (TargetToNumberMaps[values.numberMap] as TargetToNumberMap)(follower) * scaling : 0
                    return {
                        objectSource: source,
                        charSource: source.charOwner(),
                        target: follower,
                        damage: damage + relativeDamage,
                        split,
                        rot,
                    }
                }
                )]
                source.game.startNewDeepestPhase('DamageMultiplePhase', collateralDamageEvents)
            } else {
                source.game.startNewDeepestPhase('DamageSinglePhase', damageEvent)
            }
        } else if (targets.length > 1) {
            const damageEvents: DamageEvent[] = []
            for (const target of targets) {
                const relativeDamage = values.numberMap ? (TargetToNumberMaps[values.numberMap] as TargetToNumberMap)(target) * scaling : 0
                const damageEvent = new DamageEvent(source.game, {
                    objectSource: source,
                    charSource: source.charOwner(),
                    target,
                    damage: damage + relativeDamage,
                    split,
                    rot,
                })
                damageEvents.push(damageEvent)
            }
            source.game.startNewDeepestPhase('DamageMultiplePhase', damageEvents)
        }
    },

    heal: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { healing?: number, split?: boolean, numberMap?: TargetToNumberMapString, scaling?: number, nourish?: boolean }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ?? false
        const nourish = values.nourish ?? false
        const scaling = values.scaling ?? 1
        const healing = (values.healing ?? 0) <= 0 ? 0 : split ? source.truncate(values.healing / targets.length) : values.healing
        if (targets.length === 1) {
            const relativeHealing = values.numberMap ? (TargetToNumberMaps[values.numberMap] as TargetToNumberMap)(targets[0]) * scaling : 0
            const healingEvent = new HealingEvent(source.game, {
                objectSource: source,
                charSource: source.charOwner(),
                target: targets[0],
                healing: healing + relativeHealing,
                split,
                nourish,
            })
            source.game.startNewDeepestPhase('HealSinglePhase', healingEvent)
        } else if (targets.length > 1) {
            const healingEvents: HealingEvent[] = []
            for (const target of targets) {
                const relativeHealing = values.numberMap ? (TargetToNumberMaps[values.numberMap] as TargetToNumberMap)(target) * scaling : 0
                const healingEvent = new HealingEvent(source.game, {
                    objectSource: source,
                    charSource: source.charOwner(),
                    target,
                    healing: healing + relativeHealing,
                    split,
                    nourish,
                })
                healingEvents.push(healingEvent)
            }
            source.game.startNewDeepestPhase('HealMultiplePhase', healingEvents)
        }
    },

    // healRelativeToNumber: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { numberMap: TargetToNumberMapString, scaling?: number, nourish?: boolean }) => {
    //     const targets = targetObjs as Character[]
    //     const nourish = values.nourish ?? false
    //     const scaling = values.scaling ?? 1
    //     if (targets.length === 0) return
    //     if (targets.length === 1) {
    //         const healingEvent = new HealingEvent(source.game, {
    //             objectSource: source,
    //             charSource: source.charOwner(),
    //             target: targets[0],
    //             healing: (TargetToNumberMaps[values.numberMap] as TargetToNumberMap)(targets[0]) * scaling,
    //             nourish,
    //         })
    //         source.game.startNewDeepestPhase('HealSinglePhase', healingEvent)
    //     } else if (targets.length > 1) {
    //         const healingEvents: HealingEvent[] = []
    //         for (const target of targets) {
    //             const healingEvent = new HealingEvent(source.game, {
    //                 objectSource: source,
    //                 charSource: source.charOwner(),
    //                 target,
    //                 healing: (TargetToNumberMaps[values.numberMap] as TargetToNumberMap)(target) * scaling,
    //                 nourish,
    //             })
    //             healingEvents.push(healingEvent)
    //         }
    //         source.game.startNewDeepestPhase('HealMultiplePhase', healingEvents)
    //     }
    // },

    depleteCharge: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { charges?: number }) => {
        const targets = targetObjs as (Creation | NamelessFollower)[]
        const charges = values.charges ?? 1
        targets.forEach(target => {
            for (let i = 0; i < charges; i++) {
                target.loseCharge()
            }
        })
    },

    addCharge: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { charges?: number }) => {
        const targets = targetObjs as (Creation | NamelessFollower)[]
        const charges = values.charges ?? 1
        targets.forEach(target => {
            for (let i = 0; i < charges; i++) {
                target.gainCharge()
            }
        })
    },

    gainArmour: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { armour: number, forOpponent?: boolean }) => {
        const player = values.forOpponent ? source.opponent() : source.controller()
        player.gainArmour(values.armour)
    },

    draw: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values?: { number?: number, targetRequirements?: TargetRequirement[], forOpponent?: boolean }) => {
        const player = values.forOpponent ? source.opponent() : source.controller()
        const targets = values.targetRequirements?.reduce((queue, requirement) => queue.filter(card => source.targetRequirement(requirement, card)), player.deck)
        const number = values.number ?? 1
        const proposedDrawEvent = new ProposedDrawEvent(source.game, {
            player,
            number,
            targets,
        })
        source.game.startNewDeepestPhase('ProposedDrawPhase', proposedDrawEvent)
    },

    discard: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { forOpponent?: boolean }) => {
        const player = values.forOpponent ? source.opponent() : source.controller()
        targetObjs.forEach((card: Card) => {
            const discardEvent = new DiscardEvent(source.game, {
                player,
                card,
            })
            source.game.startNewDeepestPhase('DiscardPhase', discardEvent)
        })
    },

    shuffleIntoDeck: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        targetObjs.forEach((target: Card) => {
            target.moveZone('deck')
            const index = Math.floor(Math.random() * target.controller().deck.length)
            ActionOperations.setIndex(source, event, [target], { index })
        })
    },

    moveZone: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { zone: ZoneString }) => {
        const cards = targetObjs as Card[]
        cards.forEach(card => card.moveZone(values.zone))
    },

    addTargetedEffect: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { effectID: EffectIDString, target: GameObject[], expires?: EffectExpiryIDString[] }) => {
        targetObjs.forEach(target => {
            const effect = new Effects[values.effectID](source.game, target)
            ActionOperations.rememberTargets(effect, event, values.target, { param: 'target' })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    addStatEffect: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { statEffectID: StatStaticEffectIDString, statValue: number, expires?: EffectExpiryIDString[] }) => {
        targetObjs.forEach(target => {
            const effect = new StatStaticEffects[values.statEffectID](source.game, target, { statValue: values.statValue })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    addEffect: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { effectID: EffectIDString, expires?: EffectExpiryIDString[] }) => {
        targetObjs.forEach(target => {
            // console.log(values.effectID)
            const effect = new Effects[values.effectID](source.game, target)
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    addEventAction: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { eventAction: EventAction }) => {
        const targets = targetObjs as Card[]
        if (values.eventAction) targets.forEach(target => target.addEvent(values.eventAction))
    },

    copyEurekasToTarget: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const sourceCard = source as Card
        targetObjs.forEach((target: Card) => {
            sourceCard.actions.filter(action => action.eureka).forEach(eureka => {
                target.addAction(JSON.parse(JSON.stringify(eureka)))
            })
        })
    },

    buffAttack: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? source.truncate(values.attack / targets.length) : source.truncate(values.attack)
        if (attack === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.AttackBuff(source.game, target, { attack, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    buffHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { health: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const health = values.health <= 0 ? 0 : split ? source.truncate(values.health / targets.length) : source.truncate(values.health)
        if (health === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.HealthBuff(source.game, target, { health, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    buffStats: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { stats: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const stats = values.stats <= 0 ? 0 : split ? source.truncate(values.stats / targets.length) : source.truncate(values.stats)
        if (stats === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.AttackAndHealthBuff(source.game, target, { attack: stats, health: stats, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    buffAttackAndHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, health: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? source.truncate(values.attack / targets.length) : source.truncate(values.attack)
        const health = values.health <= 0 ? 0 : split ? source.truncate(values.health / targets.length) : source.truncate(values.health)
        if (attack === 0 && health === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.AttackAndHealthBuff(source.game, target, { attack, health, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    debuffAttack: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? source.truncate(values.attack / targets.length) : source.truncate(values.attack)
        if (attack === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.DebuffAttack(source.game, target, { attack, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    debuffHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { health: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const health = values.health <= 0 ? 0 : split ? source.truncate(values.health / targets.length) : source.truncate(values.health)
        if (health === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.DebuffHealth(source.game, target, { health, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    debuffStats: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { stats: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const stats = values.stats <= 0 ? 0 : split ? source.truncate(values.stats / targets.length) : source.truncate(values.stats)
        if (stats === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.DebuffAttackAndHealth(source.game, target, { attack: stats, health: stats, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    debuffAttackAndHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, health: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? source.truncate(values.attack / targets.length) : source.truncate(values.attack)
        const health = values.health <= 0 ? 0 : split ? source.truncate(values.health / targets.length) : source.truncate(values.health)
        if (attack === 0 && health === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.DebuffAttackAndHealth(source.game, target, { attack, health, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    setAttack: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? source.truncate(values.attack / targets.length) : source.truncate(values.attack)
        if (attack === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.SetAttack(source.game, target, { attack, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    setHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { health: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const health = values.health <= 0 ? 0 : split ? source.truncate(values.health / targets.length) : source.truncate(values.health)
        if (health === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.SetHealth(source.game, target, { health, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    setStats: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { stats: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const stats = values.stats <= 0 ? 0 : split ? source.truncate(values.stats / targets.length) : source.truncate(values.stats)
        if (stats === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.SetAttackAndHealth(source.game, target, { attack: stats, health: stats, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    setAttackAndHealth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attack: number, health: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Character[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const attack = values.attack <= 0 ? 0 : split ? source.truncate(values.attack / targets.length) : source.truncate(values.attack)
        const health = values.health <= 0 ? 0 : split ? source.truncate(values.health / targets.length) : source.truncate(values.health)
        if (attack === 0 && health === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.SetAttackAndHealth(source.game, target, { attack, health, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    reduceCost: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { money: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Card[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const money = values.money <= 0 ? 0 : split ? source.truncate(values.money / targets.length) : values.money
        if (money === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.CostReduction(source.game, target, { money, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    increaseCost: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { money: number, split?: boolean, expires?: EffectExpiryIDString[], effectName?: LocalisedStringObject }) => {
        const targets = targetObjs as Card[]
        if (targets.length === 0) return
        const split = values.split ? true : false
        const money = values.money <= 0 ? 0 : split ? source.truncate(values.money / targets.length) : values.money
        if (money === 0) return
        const effectName = values.effectName ?? null
        targets.forEach(target => {
            const effect = new Effects.CostIncrease(source.game, target, { money, effectName })
            if (values.expires) effect.addExpiries(values.expires)
            target.addEffect(effect)
        })
    },

    createAndStoreCard: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { cardID: string, param?: string, number?: number, forOpponent?: boolean }) => {
        const controller = values.forOpponent === undefined || !values.forOpponent ? source.controller() : source.opponent()
        const number = values.number ?? 1
        const param = values.param ?? 'createdCards'
        const cardID = values.cardID as CardIDString
        const cards: Card[] = []
        if (cardID?.length !== 0) {
            for (let i = 0; i < number; i++) {
                cards.push(source.createCard(cardID, controller))
            }
            event.stored[param] = cards
        }
    },
    createAndStoreCopy: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param?: string, number?: number, forOpponent?: boolean }) => {
        const controller = values.forOpponent === undefined || !values.forOpponent ? source.controller() : source.opponent()
        const number = values.number ?? 1
        const param = values.param ?? 'copiedCards'
        const cards: Card[] = []
        targetObjs?.forEach(target => {
            if (target instanceof Card) {
                for (let i = 0; i < number; i++) {
                    cards.push(source.createCard(target.id, controller))
                }
            }
        })
        event.stored[param] = cards
    },

    createAndStoreClone: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param?: string, number?: number, forOpponent?: boolean }) => {
        const controller = values.forOpponent === undefined || !values.forOpponent ? source.controller() : source.opponent()
        const number = values.number ?? 1
        const param = values.param ?? 'clonedCards'
        const cards: Card[] = []
        targetObjs?.forEach(target => {
            if (target instanceof Card) {
                for (let i = 0; i < number; i++) {
                    const clone = target.clone()
                    clone.owner = controller
                    cards.push(clone)
                }
            }
        })
        event.stored[param] = cards
    },

    summonCards: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { cards: Card[] }) => {
        const targetSlot = (targetObjs?.[0] instanceof BoardSlot) ? targetObjs[0] as BoardSlot
            : (source instanceof Follower && source.inPlay()) ? source.slot : null

        values.cards?.forEach(card => {
            if (card instanceof PersistentCard) {
                const eventObj = Object.assign({
                    controller: card.controller(),
                    card,
                    objectSource: source,
                    charSource: source.charOwner(),
                }, targetSlot && { targetSlot })
                const summonEvent = new SummonEvent(source.game, eventObj)
                source.game.startNewDeepestPhase('SummonPhase', summonEvent)
            }
        })
    },

    createAndSummonCard: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { cardID: string, number?: number, forOpponent?: boolean }) => {
        ActionOperations.createAndStoreCard(source, event, targetObjs, { ...values })
        ActionOperations.summonCards(source, event, targetObjs, { cards: event.stored['createdCards'] })
    },

    createAndSummonCopy: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { number?: number, forOpponent?: boolean }) => {
        ActionOperations.createAndStoreCopy(source, event, targetObjs, { ...values })
        ActionOperations.summonCards(source, event, targetObjs, { cards: event.stored['copiedCards'] })
    },

    createAndSummonClone: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { number?: number, forOpponent?: boolean }) => {
        ActionOperations.createAndStoreClone(source, event, targetObjs, { ...values })
        ActionOperations.summonCards(source, event, targetObjs, { cards: event.stored['clonedCards'] })
    },

    spendMoney: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { money: number, forOpponent?: boolean }) => {
        const player = values.forOpponent ? source.opponent() : source.controller()
        const card = source.effectOwner() as Card
        const spendMoneyEvent = new SpendMoneyEvent(source.game, {
            player,
            money: values.money,
            card,
        })
        source.game.startNewDeepestPhase('SpendMoneyPhase', spendMoneyEvent)
    },

    gainMoney: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { money: number, forOpponent?: boolean }) => {
        const player = values.forOpponent ? source.opponent() : source.controller()
        const card = source.effectOwner() as Card
        const gainMoneyEvent = new GainMoneyEvent(source.game, {
            player,
            money: values.money,
            card,
        })
        source.game.startNewDeepestPhase('GainMoneyPhase', gainMoneyEvent)
    },

    markDestroyed: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const targets = targetObjs as DestroyableCard[]
        targets.forEach(target => target.pendingDestroy = true)
    },

    forceDeathPhase: (source: GameObject, event: ActionEvent) => {
        source.game.startNewDeepestPhase('AuraUpdatePhase')
        do {
            source.game.startNewDeepestPhase('DeathPhase')
            source.game.startNewDeepestPhase('AuraUpdatePhase')
        } while (!source.game.ended && source.game.currentSequence().deathQueue.length > 0)
    },

    forceTargetUpdate: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        targetObjs.forEach(target => target.update())
    },

    forceAttack: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { attackTarget: Character[] }) => {
        const attackers = targetObjs as Character[]
        const defender = values.attackTarget[0]
        attackers.forEach(attacker => {
            if (!attacker.isDestroyed()) {
                const attackEvent = new AttackEvent(source.game, {
                    attacker,
                    defender,
                })
                source.game.startNewDeepestPhase('AttackPhase', attackEvent)
            }
        })
    },

    setIndex: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { index: number }) => {
        targetObjs.forEach((target: Card) => {
            if (!(target instanceof Card)) {
                console.log(target)
                throw Error('wat')
            }
            const moveTarget = (target instanceof Follower && target.zone === 'board') ? target.slot : target
            const zone = moveTarget.controller()[moveTarget.zone] as GameObject[]
            zone.splice(values.index, 0, zone.splice(moveTarget.index(), 1)[0])
        })
    },

    setMaxBoardSlots: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { number: number, forOpponent?: boolean }) => {
        const player = values.forOpponent ? source.opponent() : source.controller()
        player.max.board = values.number
        player.populateBoardSlots()
    },

    banish: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const targets = targetObjs as PersistentCard[]
        targets.forEach(target => target.moveZone('setAsideZone'))
    },

    resurrect: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        const charOwner = source.charOwner()
        const targetSlot = (charOwner instanceof Follower && charOwner.inPlay()) ? charOwner.slot : null
        const targets = targetObjs as PersistentCard[]
        for (const target of targets) {
            if (target.zone === 'legacy' && target.controller().canSummon(target)) {
                // if (target instanceof Follower) target.rawHealth = target.maxHealth
                // if (target instanceof Creation) target.charges = target.data.charges
                const eventObj = Object.assign({
                    controller: target.controller(),
                    card: target,
                    objectSource: source,
                    charSource: source.charOwner(),
                }, targetSlot && { targetSlot })
                const summonEvent = new SummonEvent(source.game, eventObj)
                source.game.startNewDeepestPhase('SummonPhase', summonEvent)
            }
        }
    },

    selfTransform: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        if (targetObjs[0] && source.effectOwner() instanceof Card) {
            const transformTarget = targetObjs as Card[]
            ActionOperations.transform(source, event, [source.effectOwner()], { transformTarget })
        }
    },

    transform: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { transformTarget: Card[] }) => {
        const targets = targetObjs as Card[]
        const transformTarget = values.transformTarget[0]
        targets.forEach(target => {
            const index = (target.type !== transformTarget.type && target instanceof PersistentCard && target.inPlay()) ? null : target.index()
            const clone = transformTarget.clone()
            clone.owner = target.owner
            if (target instanceof PersistentCard && target.inPlay()) {
                const targetSlot = target instanceof Follower ? target.slot : null
                ActionOperations.banish(source, event, [target])
                if (clone instanceof PersistentCard) {
                    if (source.controller().canSummon(clone)) {
                        const eventObj = Object.assign(
                            {
                                controller: source.controller(),
                                card: clone,
                                objectSource: source,
                                charSource: source.charOwner(),
                            },
                            typeof index === 'number' && { index },
                            targetSlot && { targetSlot },
                        )
                        const summonEvent = new SummonEvent(source.game, eventObj)
                        source.game.startNewDeepestPhase('SummonPhase', summonEvent)
                    }
                }
            } else {
                const zone = target.zone
                ActionOperations.banish(source, event, [target])
                target.owner[zone].splice(index, 0, clone)
            }
        })
    },

    modIncome: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { income: number, forOpponent?: boolean }) => {
        const player = values.forOpponent ? source.opponent() : source.controller()
        player.modIncome(values.income)
    },

    modGrowth: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { growth: number, forOpponent?: boolean }) => {
        const player = values.forOpponent ? source.opponent() : source.controller()
        player.modGrowth(values.growth)
    },

    forceEndTurn: (source: GameObject, event: ActionEvent, targetObjs: GameObject[]) => {
        source.game.currentSequence().forceEndTurn = true
    },

    rememberValue: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param: string, value: any }) => {
        const value = typeof values.value === 'number' ? source.truncate(values.value) : values.value
        source.memory[values.param] = value
    },

    modRememberedNumber: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param: string, number: number }) => {
        if (typeof source.memory[values.param] === 'number') source.memory[values.param] += values.number
    },

    rememberTargets: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param: string }) => {
        if (targetObjs) source.memory[values.param] = targetObjs
    },

    storeValue: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param: string, value: any }) => {
        const value = typeof values.value === 'number' ? source.truncate(values.value) : values.value
        event.stored[values.param] = value
    },

    storeTargets: (source: GameObject, event: ActionEvent, targetObjs: GameObject[], values: { param: string }) => {
        if (targetObjs) event.stored[values.param] = targetObjs
    },

    effectExpiry: (source: GameObject, event: ActionEvent) => {
        const expiryTrigger = source as Effect
        const effect = expiryTrigger.owner as Effect
        effect.expire()
    },
}

export default ActionOperations

import GameObject from '../gameObjects/GameObject'
import Character from '../gameObjects/Character'
import Effects, { StatStaticEffects } from './Effects'
import PersistentCard from '../gameObjects/PersistentCard'
import ActionEvent from '../gamePhases/ActionEvent'
import { DamageEvent } from '../gamePhases/DamageSinglePhase'
import { HealingEvent } from '../gamePhases/HealSinglePhase'
import { ProposedDrawEvent } from '../gamePhases/ProposedDrawPhase'
import { CardIDString, EffectExpiryIDString, EffectIDString, PersistentCardIDString, StatStaticEffectIDString, TargetToNumberMapString } from '../stringTypes/DictionaryKeyString'
import { SummonEvent } from '../gamePhases/SummonPhase'
import { EnterPlayEvent } from '../gamePhases/EnterPlayPhase'
import DestroyableCard from '../gameObjects/DestroyableCard'
import Follower from '../gameObjects/Follower'
import BoardSlot from '../gameObjects/BoardSlot'
import Card from '../gameObjects/Card'
import Effect from '../gameObjects/Effect'
import { TargetRequirement } from '../structs/Requirement'
import SpendMoneyPhase, { SpendMoneyEvent } from '../gamePhases/SpendMoneyPhase'
import { AttackEvent } from '../gamePhases/AttackPhase'
import Creation from '../gameObjects/Creation'
import { LocalisedStringObject } from '../structs/Localisation'
import Game from '../gamePhases/Game'
import NamelessFollower from '../gameObjects/NamelessFollower'
import { ZoneString } from '../stringTypes/ZoneTypeSubtypeString'
import TargetToNumberMaps from './TargetToNumberMaps'
import TargetToNumberMap from '../functionTypes/TargetToNumberMap'
import { EventAction } from '../structs/Action'
import { DiscardEvent } from '../gamePhases/DiscardPhase'
import { GainMoneyEvent } from '../gamePhases/GainMoneyPhase'

