const replace = require('replace-in-file')
const fs = require('fs')

const SubtypeType = process.argv[2]
const filename = process.argv[3]

const validSubtypes = [
    'NamelessFollower',
    'FamousFollower',
    'ActionMoment',
    'EventMoment',
    'WorkCreation',
    'WeaponCreation',
    'WonderCreation',
    'TechniqueCreation',
    'PermanentPassive',
    'EthosPassive',
    'ActiveLeaderTechnique',
    'PassiveLeaderTechnique',
    'StarterLeader',
    'Leader',
    'StatStaticEffect',
    'StaticEffect',
    'AuraEffect',
    'TriggerEffect',
    'EffectExpiry',
]

const files = ['AuraEffect', 'StaticEffect', 'TriggerEffect', 'StatStaticEffect', 'EffectExpiry'].includes(SubtypeType) ? 'src/game/dictionaries/Effects.ts' : 'src/game/dictionaries/Cards.ts'
const cardsOrEffects = ['AuraEffect', 'StaticEffect', 'TriggerEffect', 'StatStaticEffect', 'EffectExpiry'].includes(SubtypeType) ? 'effects' : 'cards'
const dirPath = `src/game/${cardsOrEffects}`

const existingFiles = fs.readdirSync(dirPath)

if (!validSubtypes.includes(SubtypeType)) throw Error(`Error: ${SubtypeType} is an invalid subtype`)
if (existingFiles.includes(`${filename}.ts`)) throw Error(`Error: ${filename}.ts already exists`)

const importOptions = {
    files,
    from: `// insert import here`,
    to: `import ${filename} from '../${cardsOrEffects}/${filename}'\n// insert import here`
}

const dictOptions = {
    files,
    from: `// insert ${SubtypeType} here`,
    to: `${filename},\n  // insert ${SubtypeType} here`,
}


try {
    const results = replace.sync(importOptions);
    console.log('Replacement results:', results);
} catch (error) {
    console.error('Error occurred:', error);
}

try {
    const results = replace.sync(dictOptions);
    console.log('Replacement results:', results);
} catch (error) {
    console.error('Error occurred:', error);
}

try {
    const path = `${dirPath}/${filename}.ts`
    fs.writeFileSync(path, '')
    console.log(`Created: ${path}`)
} catch (error) {
    console.error('Error occurred:', error);
}