import Character, { CharacterData } from './Character'

export interface LeaderData extends CharacterData {
  type: 'Leader'
  subtype: 'Leader'
  starter: boolean
  leaderTechniqueID: LeaderTechniqueIDString
}

abstract class Leader extends Character {
  static readonly data: LeaderData
  readonly data: LeaderData
  zone: LeaderZoneString
  inPlayZone: 'leaderZone'
  type: 'Leader'
  subtype: 'Leader'
  leaderTechniqueID: LeaderTechniqueIDString
  starter: boolean

  constructor(game: Game, owner: GamePlayer, data: LeaderData) {
    super(game, owner, data)
    this.rawAttack = 1
    this.attack = this.rawAttack
    this.inPlayZone = 'leaderZone'
    this.leaderTechniqueID = data.leaderTechniqueID
    this.starter = data.starter

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  provideReport(localisation: LocalisationString = 'english'): ObjectReport {
    this.updateActiveOptions()
    this.updateActiveActions()
    this.updateActiveEvents()

    return {
      name: this.name[localisation],
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      attack: this.attack,
      health: this.health,
      type: this.type,
      subtype: this.subtype,
      classes: this.classes,
      zone: this.zone,
      fortune: this.flags.fortune,
      guard: this.flags.guard,
      ownerName: this.owner.playerName,
      playerID: this.owner.objectID,
      canBeSelected: this.canBeSelected(),
      staticText: this.staticText[localisation],
      text: this.generateDynamicText(this.text, localisation),
      tooltips: this.tooltipsReport(),
      addedText: this.addedTextReport(),
      relatedCard: this.relatedCardReport(),
      options: this.optionsReport(localisation),
      actions: this.actionsReport(localisation),
      attackTargets: this.attackTargetsReport(),
    }
  }

  static provideReport(localisation: LocalisationString = 'english'): StaticObjectReport {
    return {
      name: this.data.name[localisation],
      id: this.data.id,
      cost: this.data.cost,
      type: this.data.type,
      attack: 1,
      health: this.data.health,
      subtype: this.data.subtype,
      text: this.data.staticText[localisation],
      classes: this.data.classes,
    }
  }

  relatedCardReport(localisation: LocalisationString = 'english'): StaticObjectReport {
    if (!this.inPlay()) return Cards[this.leaderTechniqueID].provideReport()
    else return null
  }

  finishUpdate(): void {
    // this.updateActiveOptions()
    // this.updateActiveActions()
    this.toggleAttack()
    this.updateActiveEvents()
    this.updateActiveDeathEvents()
    this.updateAttackTargets()
    this.attack = this.truncate(this.attack)
    this.health = this.truncate(this.health)
    if (this.cost < 0) this.cost = 0
    this.cost = this.truncate(this.cost)
    this.healthStatic = this.truncate(this.healthStatic)
  }

  updateAttackTargets(): void {
    this.attackTargets = this.inPlay() ? this.owner.opponentPlayer.boardFollowers().filter(defender => {
      return Permissions.canAttack(this, defender)
    }) : []
  }

  takeDamage(damage: number, rot?: boolean): number {
    let reducedDamage = damage - this.stats.damageReduction >= 0 ? damage - this.stats.damageReduction : 0
    if (this.flags.immune && !rot) reducedDamage = 0
    if (reducedDamage > 0 && this.flags.fortune && !rot) {
      reducedDamage = 0
      this.flags.fortune = false
      this.effects = this.effects.filter(effect => !(effect instanceof Fortune))
    }
    let actualDamage = reducedDamage
    if (this.inPlay()) {
      actualDamage = this.owner.takeDamage(reducedDamage, rot)
    } else {
      this.health -= actualDamage
      this.rawHealth -= actualDamage
    }
    this.update()
    return actualDamage
  }

  receiveHealing(rawHealing: number, nourish?: boolean): number {
    let healing = rawHealing
    if (this.inPlay()) {
      healing = this.owner.receiveHealing(rawHealing, nourish)
    } else {
      this.health += healing
      this.rawHealth += healing
    }
    return healing
  }

  missingHealth(): number {
    return this.owner.maxHealth - this.owner.currentHealth
  }

  unprotected(): boolean {
    return this.controller().boardFollowers().length === 0
  }

  baseData(): GameObjectData {
    return {
      id: this.data.id,
      name: this.data.name,
      attack: this.baseAttack(),
      health: this.baseHealth(),
      cost: this.rawCost,
      stats: this.baseStats(),
      flags: this.baseFlags(),
    }
  }

  baseAttack(): number {
    return this.rawAttack
    // if (this.inPlay()) {
    //   const weaponsAttack = (this.controller().creationZone
    //     .filter(creation => creation instanceof WeaponCreation) as WeaponCreation[])
    //     .map(weapon => weapon.attack)
    //     .reduce((acc, val) => acc + val, 0)
    //   return this.rawAttack + weaponsAttack
    // } else {
    //   return this.rawAttack
    // }
  }

  baseHealth(): number {
    if (this.inPlay()) {
      return this.owner.currentHealth
    } else {
      return this.rawHealth
    }
  }

  applyInherited(): void {
    if (this.inPlay()) {
      const weaponsAttack = this.controller().weapons()
        .map(weapon => weapon.attack)
        .reduce((acc, val) => acc + val, 0)

      this.attack += weaponsAttack

      const weaponsFlags = this.controller().weapons().map(weapon => weapon.flags)
      Object.assign(this.flags, ...weaponsFlags)
    }
  }

  baseFlags(): FlagsObject {
    // if (this.inPlay()) {
    //   const weaponsFlags = this.controller().creationZone.filter(creation => creation instanceof WeaponCreation).map(weapon => weapon.flags)
    //   return Object.assign({}, ...weaponsFlags)
    // }
    return {}
  }

  getReady(): void {
    this.ready = true
  }

  toggleAttack(): void {
    if (this.inPlay() && !this.controller().myTurn()) this.attack = 0
  }

  setData(dataObj: GameObjectData): void {
    if (dataObj.cost < 0) dataObj.cost = 0
    this.toggleAttack()
    this.healthStatic = this.truncate(dataObj.health)
    Object.assign(this, dataObj)
  }

  moveZone(destination: LeaderZoneString, index?: number): void {
    if (this.zone === 'leaderZone') this.game.inPlay.splice(this.game.inPlay.indexOf(this), 1)
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)

    if (destination === 'leaderZone') {
      const health = this.health
      if (this.owner.leaderZone[0]) this.owner.leaderZone[0].moveZone('legacy')
      this.game.inPlay.push(this)
      this.owner.maxHealth += health
      this.owner.currentHealth += health
      if (this.game.activeChild) {
        const leaderTechnique = this.createCard(this.leaderTechniqueID, this.controller()) as LeaderTechnique
        const summonEvent = new SummonEvent(this.game, {
          controller: this.controller(),
          card: leaderTechnique,
          objectSource: this,
          charSource: this
        })
        this.game.startNewDeepestPhase('SummonPhase', summonEvent)
      }
    }

    if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
    else this.owner[destination].push(this)
    this.zone = destination
    this.updateEffects()
  }
}

export default Leader

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { LeaderZoneString } from '../stringTypes/ZoneTypeSubtypeString'
import { CardIDString, LeaderTechniqueIDString } from '../stringTypes/DictionaryKeyString'
import { ObjectReport, StaticObjectReport } from '../structs/ObjectReport'
import GameObjectData, { FlagsObject } from '../structs/GameObjectData'
import WeaponCreation from './WeaponCreation'
import Permissions from '../dictionaries/Permissions'
import { SummonEvent } from '../gamePhases/SummonPhase'
import { LocalisationString } from '../structs/Localisation'
import LeaderTechnique from './LeaderTechnique'
import Cards from '../dictionaries/Cards'
import Fortune from '../effects/Fortune'

