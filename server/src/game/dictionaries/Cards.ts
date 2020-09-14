import GameObject from '../gameObjects/GameObject'
import Enchantment from '../gameObjects/Enchantment'
import Card from '../gameObjects/Card'
import PersistentCard from '../gameObjects/PersistentCard'
import DestroyableCard from '../gameObjects/DestroyableCard'
import Character from '../gameObjects/Character'
import Follower from '../gameObjects/Follower'
import Moment from '../gameObjects/Moment'
import LeaderTechnique from '../gameObjects/LeaderTechnique'
import Passive from '../gameObjects/Passive'
import Creation from '../gameObjects/Creation'
import StaticEnchantment from '../gameObjects/StaticEnchantment'
import AuraEnchantment from '../gameObjects/AuraEnchantment'
import TriggerEnchantment from '../gameObjects/TriggerEnchantment'
import NamelessFollower from '../gameObjects/NamelessFollower'
import FamousFollower from '../gameObjects/FamousFollower'
import PermanentPassive from '../gameObjects/PermanentPassive'
import ActiveLeaderTechnique from '../gameObjects/ActiveLeaderTechnique'
import TechniqueCreation from '../gameObjects/TechniqueCreation'
import WonderCreation from '../gameObjects/WonderCreation'
import WeaponCreation from '../gameObjects/WeaponCreation'
import WorkCreation from '../gameObjects/WorkCreation'
import Leader from '../gameObjects/Leader'
import ActionMoment from '../gameObjects/ActionMoment'
import EventMoment from '../gameObjects/EventMoment'
GameObject
Card
Enchantment
StaticEnchantment
AuraEnchantment
TriggerEnchantment
PersistentCard
DestroyableCard
Creation
Character
Follower
Moment
LeaderTechnique
Passive
NamelessFollower
FamousFollower
PermanentPassive
ActiveLeaderTechnique
TechniqueCreation
WeaponCreation
WonderCreation
WorkCreation
ActionMoment
EventMoment
Leader

import Footman from '../cards/Footman'
import RoyalGuard from '../cards/RoyalGuard'
import JuniorOrc from '../cards/JuniorOrc'
import SavageWolf from '../cards/SavageWolf'
import Fireburst from '../cards/Fireburst'
import Consume from '../cards/Consume'
import HolyBook from '../cards/HolyBook'
import ClubOfLooting from '../cards/ClubOfLooting'
import KnightAcademy from '../cards/KnightAcademy'
import Knight from '../cards/Knight'
import CorporalMotivation from '../cards/CorporalMotivation'
import Orcissimus from '../cards/Orcissimus'
import KingFredTheSaintlyRecruit from '../cards/KingFredTheSaintlyRecruit'
import OrkusTheOrkest from '../cards/OrkusTheOrkest'
import OrkusTheOrkestSmash from '../cards/OrkusTheOrkestSmash'
import KingFredTheSaintly from '../cards/KingFredTheSaintly'
import PrinceTimothy from '../cards/PrinceTimothy'
import HolyProtectors from '../cards/HolyProtectors'
import SingleMindedFury from '../cards/SingleMindedFury'
import CombatTraining from '../cards/CombatTraining'
import BattleOfSuiyang from '../cards/BattleOfSuiyang'
import NapalmStrike from '../cards/NapalmStrike'
import SuicideBomber from '../cards/SuicideBomber'
import BodyDouble from '../cards/BodyDouble'
import Archimedes from '../cards/Archimedes'
import JohnFKennedy from '../cards/JohnFKennedy'
import WallLabourer from '../cards/WallLabourer'

export const NamelessFollowers = {
  Footman,
  RoyalGuard,
  SavageWolf,
  JuniorOrc,
  Knight,
  SuicideBomber,
  BodyDouble,
  WallLabourer,
  Orcissimus,
}

export const FamousFollowers = {
  // Orcissimus,
  PrinceTimothy,
  Archimedes,
  JohnFKennedy,
}

export const ActionMoments = {
  Fireburst,
  NapalmStrike,
}

export const EventMoments = {
  Consume,
  BattleOfSuiyang,
}

export const WorkCreations = {
  HolyBook,
}

export const WeaponCreations = {
  ClubOfLooting,
}

export const WonderCreations = {
  KnightAcademy,
}

export const TechniqueCreations = {
  CorporalMotivation,
}

export const PermanentPassives = {
  CombatTraining,
}

export const EthosPassives = {
  HolyProtectors,
  SingleMindedFury,
}

export const ActiveLeaderTechniques = {
  OrkusTheOrkestSmash,
  KingFredTheSaintlyRecruit,
}

export const Leaders = {
  OrkusTheOrkest,
  KingFredTheSaintly,
}

export const Followers =  {...NamelessFollowers, ...FamousFollowers}
export const Characters = {...Leaders, ...Followers}
export const Creations = {...WorkCreations, ...WeaponCreations, ...WonderCreations, ...TechniqueCreations}
export const LeaderTechniques = {...ActiveLeaderTechniques}
export const Passives = {...PermanentPassives, ...EthosPassives}
export const Moments = {...ActionMoments, ...EventMoments}
export const DestroyableCards = {...Characters, ...Creations}
export const PersistentCards = {...DestroyableCards, ...Passives, ...LeaderTechniques}

const Cards = {...PersistentCards, ...Moments}
// const Cards = {...Followers, ...Leaders, ...Creations, ...LeaderTechniques, ...Passives, ...Moments}

export default Cards