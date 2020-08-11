import Effect from '../functionTypes/Effect'

const Effects: { [index: string]: Effect } = {
    guard: (flags) => { flags.guard = true },
    pillage: (flags) => { flags.pillage = true },
    incrementAttack: (stats, value) => { stats.attack += value },
    incrementHealth: (stats, value) => { stats.health += value },
}

export default Effects