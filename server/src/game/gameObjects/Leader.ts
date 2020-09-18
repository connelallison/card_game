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
    this.inPlayZone = 'leaderZone'
    this.leaderTechniqueID = data.leaderTechniqueID
    this.starter = data.starter

    this.game.event.on('startOfTurn', (event) => this.startOfTurn(event))
  }

  provideReport(localisation: LocalisationString = 'english'): ObjectReport {
    return {
      name: this.name[localisation],
      id: this.id,
      objectID: this.objectID,
      cost: this.cost,
      attack: this.attack,
      health: this.health,
      type: this.type,
      subtype: this.subtype,
      zone: this.zone,
      ownerName: this.owner.playerName,
      playerID: this.owner.objectID,
      canBeSelected: this.canBeSelected(),
      staticText: this.staticText[localisation],
      text: this.generateDynamicText(this.text, localisation),
      options: this.optionsReport(localisation),
      actions: this.actionsReport(localisation),
      attackTargets: this.attackTargetIDs(),
    }
  }

  updateArrays(): void {
    this.updateActiveOptions()
    this.updateActiveActions()
    this.updateActiveEvents()
    this.updateActiveDeathEvents()
    this.updateAttackTargets()
  }

  updateAttackTargets(): void {
    this.attackTargets = this.inPlay() ? this.owner.opponent.boardFollowers().filter(defender => {
      return Permissions.canAttack(this, defender)
    }) : []
  }

  takeDamage(damage: number): number {
    const reducedDamage = this.owner.takeDamage(damage)
    this.update()
    return reducedDamage
  }

  receiveHealing(rawHealing: number): number {
    const healing = rawHealing <= this.missingHealth() ? rawHealing : this.missingHealth()
    this.owner.currentHealth += healing
    this.update()
    return healing
  }

  missingHealth(): number {
    return this.owner.maxHealth - this.owner.currentHealth
  }

  baseData(): GameObjectData {
    return {
      id: this.originalID,
      name: this.originalName,
      attack: this.baseAttack(),
      health: this.baseHealth(),
      cost: this.rawCost,
      debt: 0,
      flags: this.baseFlags(),
    }
  }

  baseAttack(): number {
    if (this.inPlay()) {
      const weaponsAttack = (this.controller().creationZone
        .filter(creation => creation instanceof WeaponCreation) as WeaponCreation[])
        .map(weapon => weapon.attack)
        .reduce((acc, val) => acc + val, 0)
      return this.rawAttack + weaponsAttack
    } else {
      return this.rawAttack
    }
  }

  baseHealth(): number {
    if (this.inPlay()) {
      return this.owner.currentHealth
    } else {
      return this.rawHealth
    }
  }

  baseFlags(): FlagsObject {
    if (this.inPlay()) {
      const weaponsFlags = this.controller().creationZone.filter(creation => creation instanceof WeaponCreation).map(weapon => weapon.flags)
      return Object.assign({}, ...weaponsFlags)
    }
    return {}
  }

  getReady(): void {
    if (this.inPlay()) {
      this.ready = true
    } else {
      throw new Error(`getReady() is being called on a character (${this.name}) while not in play`)
    }
  }


  toggleAttack(dataObj: GameObjectData): void {
    if (this.inPlay() && !this.controller().myTurn()) dataObj.attack = 0
  }

  setData(dataObj: GameObjectData): void {
    this.toggleAttack(dataObj)
    Object.assign(this, dataObj)
  }

  moveZone(destination: LeaderZoneString, index?: number): void {
    if (this.zone === 'leaderZone') this.game.inPlay.splice(this.game.inPlay.indexOf(this), 1)
    this.owner[this.zone].splice(this.owner[this.zone].indexOf(this), 1)

    if (destination === 'leaderZone') {
      if (this.owner.leaderZone[0]) this.owner.leaderZone[0].moveZone('graveyard')
      this.game.inPlay.push(this)
    }

    if (typeof index === 'number') this.owner[destination].splice(index, 0, this)
    else this.owner[destination].push(this)
    this.zone = destination
    this.updateEnchantments()
  }

  putIntoPlay(): void {
    const health = this.health
    this.moveZone(this.inPlayZone)
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
}

export default Leader

import Game from '../gamePhases/Game'
import GamePlayer from './GamePlayer'
import { LeaderZoneString } from '../stringTypes/ZoneTypeSubtypeString'
import { CardIDString, LeaderTechniqueIDString } from '../stringTypes/DictionaryKeyString'
import { ObjectReport } from '../structs/ObjectReport'
import GameObjectData, { FlagsObject } from '../structs/GameObjectData'
import WeaponCreation from './WeaponCreation'
import Permissions from '../dictionaries/Permissions'
import { SummonEvent } from '../gamePhases/SummonPhase'
import { LocalisationString } from '../structs/Localisation'
import LeaderTechnique from './LeaderTechnique'

