export const AllZones = ['hand', 'board', 'deck', 'legacy', 'leaderZone', 'creationZone', 'leaderTechniqueZone', 'passiveZone', 'setAsideZone', 'global'] as const
export const PlayZones = ['board', 'leaderZone', 'creationZone', 'leaderTechniqueZone', 'passiveZone', 'global'] as const
export const InGameZones = ['hand', 'board', 'deck', 'legacy', 'leaderZone', 'creationZone', 'leaderTechniqueZone','passiveZone', 'global'] as const
export const LeaderZones = ['leaderZone', 'hand', 'deck', 'legacy', 'setAsideZone'] as const
export const FollowerZones = ['board', 'hand', 'deck', 'legacy', 'setAsideZone'] as const
export const CreationZones = ['creationZone', 'hand', 'deck', 'legacy', 'setAsideZone'] as const
export const MomentZones = ['hand', 'deck', 'legacy', 'setAsideZone'] as const
export const PassiveZones = ['hand', 'deck', 'legacy','passiveZone', 'setAsideZone'] as const
export const LeaderTechniqueZones = ['leaderTechniqueZone', 'setAsideZone', 'legacy'] as const
export type ZoneString = typeof AllZones[number]
export type PlayZoneString = typeof PlayZones[number]
export type InGameZoneString = typeof InGameZones[number]
export type LeaderZoneString = typeof LeaderZones[number]
export type FollowerZoneString = typeof FollowerZones[number]
export type CreationZoneString = typeof CreationZones[number]
export type MomentZoneString = typeof MomentZones[number]
export type PassiveZoneString = typeof PassiveZones[number]
export type LeaderTechniqueZoneString = typeof LeaderTechniqueZones[number]

export type DynamicZoneString = ZoneString | DynamicStringObject
export type DynamicOrStoredZoneString = ZoneString | DynamicOrStoredStringObject

export const CharacterTypes = ['Leader' , 'Follower'] as const
export const DestroyableCardTypes = [...CharacterTypes, 'Creation'] as const
export const PersistentCardTypes = [...DestroyableCardTypes, 'LeaderTechnique', 'Passive'] as const
export const CardTypes = [...PersistentCardTypes, 'Moment'] as const
export const ObjectTypes = [...CardTypes, 'Player', 'Effect', 'BoardSlot'] as const
export type CharacterTypeString = typeof CharacterTypes[number]
export type DestroyableCardTypeString = typeof DestroyableCardTypes[number]
export type PersistentCardTypeString = typeof PersistentCardTypes[number]
export type CardTypeString = typeof CardTypes[number]
export type ObjectTypeString = typeof ObjectTypes[number]

import { DynamicStringObject, DynamicOrStoredStringObject } from "../structs/DynamicValueObject"

export const FollowerSubtypes = ['Nameless', 'Famous'] as const
export const LeaderSubtypes = ['Leader'] as const
export const CharacterSubtypes = [...FollowerSubtypes, ...LeaderSubtypes] as const
export const CreationSubtypes = ['Work', 'Wonder', 'Weapon', 'Technique'] as const
export const DestroyableCardSubtypes = [...CharacterSubtypes, ...CreationSubtypes] as const
export const PassiveSubtypes = ['Permanent'] as const
export const LeaderTechniqueSubtypes = ['Active', 'Passive'] as const
export const PersistentCardSubtypes = [...DestroyableCardSubtypes, ...PassiveSubtypes, ...LeaderTechniqueSubtypes] as const
export const MomentSubtypes = ['Action', 'Event', 'Option'] as const
export const CardSubtypes = [...PersistentCardSubtypes, ...MomentSubtypes] as const
export const EffectSubtypes = ['Static', 'Aura', 'Trigger'] as const
export const ObjectSubtypes = [...CardSubtypes, ...EffectSubtypes, 'Player', 'BoardSlot'] as const

export type FollowerSubtypeString = typeof FollowerSubtypes[number]
export type LeaderSubtypeString = typeof LeaderSubtypes[number]
export type CharacterSubtypeString = typeof CharacterSubtypes[number]
export type CreationSubtypeString = typeof CreationSubtypes[number]
export type DestroyableCardSubtypeString = typeof DestroyableCardSubtypes[number]
export type PassiveSubtypeString = typeof PassiveSubtypes[number]
export type LeaderTechniqueSubtypeString = typeof LeaderTechniqueSubtypes[number]
export type PersistentCardSubtypeString = typeof PersistentCardSubtypes[number]
export type MomentSubtypeString = typeof MomentSubtypes[number]
export type CardSubtypeString = typeof CardSubtypes[number]
export type EffectSubtypeString = typeof EffectSubtypes[number]
export type ObjectSubtypeString = typeof ObjectSubtypes[number]

export type ActiveZones = ZoneString[] | 'inPlay'
export type ActiveTypes = ObjectTypeString[] | 'Persistent' | 'Character' | 'Card' | 'inPlay'
export type ActiveSubtypes = ObjectSubtypeString[] | 'hasAttack'