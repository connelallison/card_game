export type ZoneString = 'hand' | 'board' | 'deck' | 'graveyard' | 'leaderZone' | 'creationZone' | 'leaderTechniqueZone' |'passiveZone' | 'setAsideZone'
export type PlayZoneString = 'board' | 'leaderZone' | 'creationZone' | 'leaderTechniqueZone' | 'passiveZone'
export type LeaderZoneString = 'leaderZone' | 'hand' | 'deck' | 'graveyard' | 'setAsideZone'
export type FollowerZoneString = 'board' | 'hand' | 'deck' | 'graveyard' | 'setAsideZone'
export type CreationZoneString = 'creationZone' | 'hand' | 'deck' | 'graveyard' | 'setAsideZone'
export type MomentZoneString = 'hand' | 'deck' | 'graveyard' | 'setAsideZone'
export type PassiveZoneString = 'hand' | 'deck' | 'graveyard' |'passiveZone' | 'setAsideZone'
export type LeaderTechniqueZoneString = 'leaderTechniqueZone' | 'setAsideZone' | 'graveyard'

export type DynamicZoneString = ZoneString | DynamicStringObject

import { DynamicStringObject } from "../structs/DynamicValueObject"
