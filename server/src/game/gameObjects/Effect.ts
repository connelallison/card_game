import GameObject from './GameObject'

export interface EffectData {
    id: string
    name: LocalisedStringObject
    type: 'Effect'
    subtype: EffectSubtypeString
    text: DynamicTextObject
    activeZones?: ActiveZones
    activeTypes?: ActiveTypes
    activeSubtypes?: ActiveSubtypes
    activeRequirements?: ActiveRequirement[]
    expires?: EffectExpiryIDString[]
}

abstract class Effect extends GameObject {
    static readonly data: EffectData
    readonly data: EffectData
    id: EffectIDString
    owner: GameObject
    type: 'Effect'
    subtype: EffectSubtypeString
    text: DynamicTextObject
    activeZones: ZoneString[]
    activeTypes: ObjectTypeString[]
    activeSubtypes: ObjectSubtypeString[]
    activeRequirements: ActiveRequirement[]
    active: boolean

    constructor(game: Game, owner: GameObject, data: EffectData) {
        super(game, data.id, data.name, 'Effect', data.subtype)
        this.owner = owner
        this.zone = this.owner.zone
        this.text = data.text
        this.activeZones = this.parseActiveZones(data.activeZones)
        this.activeTypes = this.parseActiveTypes(data.activeTypes)
        this.activeSubtypes = this.parseActiveSubtypes(data.activeSubtypes)
        this.activeRequirements = data.activeRequirements || []
        if (data.expires) this.addExpiries(data.expires)
        this.active = false
        this.data = data
    }

    wrappedEffects(effectObjs: EffectFunctionObject[]): EffectFunction[] {
        return effectObjs.map(effectObj => (data: GameObjectData): void => (EffectOperations[effectObj.operation] as EffectOperation)(data, this.dynamicValue(effectObj.value) as number | boolean))
    }

    addExpiries(expiries: EffectExpiryIDString[]): void {
        expiries.forEach(effect => this.addBaseEffect(this.createEffect(effect, this)))
    }

    updateActive(): boolean {
        this.zone = this.owner.zone
        const active = this.activeZones.includes(this.owner.zone)
            && this.activeTypes.includes(this.owner.type)
            && this.activeSubtypes.includes(this.owner.subtype)
            && this.activeRequirements.every(requirement => this.requirement(requirement))
        this.active = active
        this.updateEffects()
        return active
    }

    charOwner(): Character {
        return this.owner.charOwner()
    }

    baseData(): GameObjectData {
        return {
            flags: this.baseFlags()
        }
    }

    effectOwner(): GameObject {
        return this.owner.effectOwner()
    }

    expire(): void {
        this.owner.removeEffect(this)
        this.owner = null
    }

    abstract clone(newOwner): Effect
}

export default Effect

import Game from '../gamePhases/Game'
import { ActiveSubtypes, ActiveTypes, ActiveZones, EffectSubtypeString, ObjectSubtypeString, ObjectTypeString, ZoneString } from '../stringTypes/ZoneTypeSubtypeString'
import EffectFunctionObject from '../structs/EffectFunctionObject'
import EffectFunction from '../functionTypes/EffectFunction'
import GameObjectData from '../structs/GameObjectData'
import EffectOperations from '../dictionaries/EffectOperations'
import EffectOperation from '../functionTypes/EffectOperation'
import Character from './Character'
import { EffectIDString, EffectExpiryIDString } from '../stringTypes/DictionaryKeyString'
import { DynamicTextObject, LocalisedStringObject } from '../structs/Localisation'
import { ActiveRequirement } from '../structs/Requirement'
