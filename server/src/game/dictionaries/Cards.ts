import GameObject from '../gameObjects/GameObject'
import Effect from '../gameObjects/Effect'
import Card from '../gameObjects/Card'
import PersistentCard from '../gameObjects/PersistentCard'
import DestroyableCard from '../gameObjects/DestroyableCard'
import Character from '../gameObjects/Character'
import Follower from '../gameObjects/Follower'
import Moment from '../gameObjects/Moment'
import LeaderTechnique from '../gameObjects/LeaderTechnique'
import Passive from '../gameObjects/Passive'
import Creation from '../gameObjects/Creation'
import StaticEffect from '../gameObjects/StaticEffect'
import AuraEffect from '../gameObjects/AuraEffect'
import TriggerEffect from '../gameObjects/TriggerEffect'
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
Effect
StaticEffect
AuraEffect
TriggerEffect
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
import Lictor from '../cards/Lictor'
import JuniorOrc from '../cards/JuniorOrc'
import SavageWolf from '../cards/SavageWolf'
import Fireburst from '../cards/Fireburst'
import Consume from '../cards/Consume'
import BeveridgeReport from '../cards/BeveridgeReport'
import ClubOfLooting from '../cards/ClubOfLooting'
import CitizenAcademy from '../cards/CitizenAcademy'
import Citizen from '../cards/Citizen'
import CorporalMotivation from '../cards/CorporalMotivation'
import Orcissimus from '../cards/Orcissimus'
import NapoleonBonaparteLeveeEnMasse from '../cards/NapoleonBonaparteLeveeEnMasse'
import OrkusTheOrkest from '../cards/OrkusTheOrkest'
import OrkusTheOrkestSmash from '../cards/OrkusTheOrkestSmash'
import NapoleonBonaparte from '../cards/NapoleonBonaparte'
import PrinceTimothy from '../cards/PrinceTimothy'
import TulipMania from '../cards/TulipMania'
import SingleMindedFury from '../cards/SingleMindedFury'
import CombatTraining from '../cards/CombatTraining'
import BattleOfSuiyang from '../cards/BattleOfSuiyang'
import NapalmStrike from '../cards/NapalmStrike'
import SuicideBomber from '../cards/SuicideBomber'
import BodyDouble from '../cards/BodyDouble'
import Archimedes from '../cards/Archimedes'
import JohnFKennedy from '../cards/JohnFKennedy'
import WallLabourer from '../cards/WallLabourer'
import TechEntrepreneur from '../cards/TechEntrepreneur'
import DivideAndConquer from '../cards/DivideAndConquer'
import Orpheus from '../cards/Orpheus'
import JohnTheBaptist from '../cards/JohnTheBaptist'
import Slave from '../cards/Slave'
import Spartacus from '../cards/Spartacus'
import SpartacusSolidarity from '../cards/SpartacusSolidarity'
import JohannesGutenberg from '../cards/JohannesGutenberg'
import MelvilDewey from '../cards/MelvilDewey'
import NikolaTesla from '../cards/NikolaTesla'
import Konigstiger from '../cards/Konigstiger'

export const NamelessFollowers = {
  Footman,
  Lictor,
  SavageWolf,
  JuniorOrc,
  Citizen,
  SuicideBomber,
  BodyDouble,
  WallLabourer,
  TechEntrepreneur,
  Slave,
  Konigstiger,
}

export const FamousFollowers = {
  Orcissimus,
  PrinceTimothy,
  Archimedes,
  JohnFKennedy,
  Orpheus,
  JohnTheBaptist,
  JohannesGutenberg,
  MelvilDewey,
  NikolaTesla,
}

export const ActionMoments = {
  Fireburst,
  NapalmStrike,
  DivideAndConquer,
}

export const EventMoments = {
  Consume,
  BattleOfSuiyang,
}

export const WorkCreations = {
  BeveridgeReport,
}

export const WeaponCreations = {
  ClubOfLooting,
}

export const WonderCreations = {
  CitizenAcademy,
}

export const TechniqueCreations = {
  CorporalMotivation,
}

export const PermanentPassives = {
  CombatTraining,
}

export const EthosPassives = {
  TulipMania,
  SingleMindedFury,
}

export const ActiveLeaderTechniques = {
  OrkusTheOrkestSmash,
  NapoleonBonaparteLeveeEnMasse,
}

export const PassiveLeaderTechniques = {
  SpartacusSolidarity,
}

export const StarterLeaders = {
  OrkusTheOrkest,
  NapoleonBonaparte,
}

export const Leaders = {
  ...StarterLeaders,
  Spartacus,
}

export const Followers =  {...NamelessFollowers, ...FamousFollowers}
export const Characters = {...Leaders, ...Followers}
export const Creations = {...WorkCreations, ...WeaponCreations, ...WonderCreations, ...TechniqueCreations}
export const LeaderTechniques = {...ActiveLeaderTechniques, ...PassiveLeaderTechniques}
export const Passives = {...PermanentPassives, ...EthosPassives}
export const Moments = {...ActionMoments, ...EventMoments}
export const DestroyableCards = {...Characters, ...Creations}
export const PersistentCards = {...DestroyableCards, ...Passives, ...LeaderTechniques}

const Cards = {...PersistentCards, ...Moments}
// const Cards = {...Followers, ...Leaders, ...Creations, ...LeaderTechniques, ...Passives, ...Moments}

export default Cards