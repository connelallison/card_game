const EffectOperations = {
    guard: (data, value: boolean) => { data.flags.guard = value },
    pillage: (data, value: boolean) => { data.flags.pillage = value },
    rush: (data, value: boolean) => { data.flags.rush = value },
    incrementAttack: (data, value: number) => { data.attack += value >= 0 ? value : 0 },
    incrementHealth: (data, value: number) => { data.health += value >= 0 ? value : 0 },
    incrementDebt: (data, value: number) => { data.debt += value >= 0 ? value : 0 },
    incrementRent: (data, value: number) => { data.rent += value >= 0 ? value : 0 },
    incrementFervour: (data, value: number) => { data.fervour += value >= 0 ? value : 0 },
}

export default EffectOperations