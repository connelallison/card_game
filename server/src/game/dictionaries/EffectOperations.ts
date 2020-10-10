import { isNullOrUndefined } from "util"
import { LocalisedStringObject } from "../structs/Localisation"

const EffectOperations = {
    guard: (data, value: boolean) => { data.flags.guard = value },
    pillage: (data, value: boolean) => { data.flags.pillage = value },
    rush: (data, value: boolean) => { data.flags.rush = value },
    mob: (data, value: boolean) => { data.flags.mob = value },
    cantAttack: (data, value: boolean) => { data.flags.cantAttack = value },
    incrementAttack: (data, value: number) => { data.attack += value >= 0 ? value : 0 },
    incrementHealth: (data, value: number) => { data.health += value >= 0 ? value : 0 },
    decreaseCost: (data, value: number) => { data.cost -= value >= 0 ? value : 0 },
    incrementDebt: (data, value: number) => { data.stats.debt += value >= 0 ? value : 0 },
    incrementRent: (data, value: number) => { data.stats.rent += value >= 0 ? value : 0 },
    incrementFervour: (data, value: number) => { data.stats.fervour += value >= 0 ? value : 0 },
    incrementDamageReduction: (data, value: number) => { data.stats.damageReduction += value >= 0 ? value : 0 },
    setID: (data, value: string) => { data.id = value },
    setName: (data, value: LocalisedStringObject) => { data.name = value },
}

export default EffectOperations