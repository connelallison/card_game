import Guard from '../effects/Guard'
import Pillage from '../effects/Pillage'
import Rush from '../effects/Rush'
import FootmanAura from '../effects/FootmanAura'
import AttackBuff from '../effects/AttackBuff'
import HealthBuff from '../effects/HealthBuff'
import AttackAndHealthBuff from '../effects/AttackAndHealthBuff'
import JuniorOrcAura from '../effects/JuniorOrcAura'
import SavageWolfTrigger from '../effects/SavageWolfTrigger'
import BeveridgeReportTrigger from '../effects/BeveridgeReportTrigger'
import TwelveTablesTrigger from '../effects/TwelveTablesTrigger'
import TulipManiaAura from '../effects/TulipManiaAura'
import SingleMindedFuryTrigger from '../effects/SingleMindedFuryTrigger'
import SecondAmendmentAura from '../effects/SecondAmendmentAura'
import ExpiresStartOfMyTurn from '../effects/ExpiresStartOfMyTurn'
import Debt from '../effects/Debt'
import Rent from '../effects/Rent'
import Fervour from '../effects/Fervour'
import ExpiresEndOfMyTurn from '../effects/ExpiresEndOfMyTurn'
import OrpheusTrigger from '../effects/OrpheusTrigger'
import JohnTheBaptistAura from '../effects/JohnTheBaptistAura'
import Mob from '../effects/Mob'
import SlaveAura from '../effects/SlaveAura'
import SpartacusSolidarityAura from '../effects/SpartacusSolidarityAura'
import CostReduction from '../effects/CostReduction'
import DamageReduction from '../effects/DamageReduction'
import DavidHumeOrganiseThoughtsTrigger from '../effects/DavidHumeOrganiseThoughtsTrigger'
import UniversityOfOxfordTrigger from '../effects/UniversityOfOxfordTrigger'
import Snipe from '../effects/Snipe'
import ThrillOfDiscoveryTrigger from '../effects/ThrillOfDiscoveryTrigger'
import Passionate from '../effects/Passionate'
import SelmaMarcherAura from '../effects/SelmaMarcherAura'
import SetAttack from '../effects/SetAttack'
import SetHealth from '../effects/SetHealth'
import SetAttackAndHealth from '../effects/SetAttackAndHealth'
import LesMiserablesTrigger from '../effects/LesMiserablesTrigger'
import NelsonMandelaTruthAndReconciliationTrigger from '../effects/NelsonMandelaTruthAndReconciliationTrigger'
import PeacefulResistanceTrigger from '../effects/PeacefulResistanceTrigger'
import StonewallRioterAura from '../effects/StonewallRioterAura'
import LudwigIITrigger from '../effects/LudwigIITrigger'
import SubprimeBorrowerTrigger from '../effects/SubprimeBorrowerTrigger'
import Fortune from '../effects/Fortune'
import TankManAura from '../effects/TankManAura'
import Bloodthirst from '../effects/Bloodthirst'
import GeneralStrike1926Aura from '../effects/GeneralStrike1926Aura'
import ExpiresEndOfMyNextTurn from '../effects/ExpiresEndOfMyNextTurn'
import SpartacusGladiatorAura from '../effects/SpartacusGladiatorAura'
import RobespierreTrigger from '../effects/RobespierreTrigger'
import AugusteEscoffierTrigger from '../effects/AugusteEscoffierTrigger'
import LibraryOfAlexandriaTrigger from '../effects/LibraryOfAlexandriaTrigger'
import LibraryOfAlexandriaAura from '../effects/LibraryOfAlexandriaAura'
import AlfredNobelTrigger from '../effects/AlfredNobelTrigger'
import ThomasBodleyTrigger from '../effects/ThomasBodleyTrigger'
import StatueOfLibertyTrigger from '../effects/StatueOfLibertyTrigger'
import StatueOfLibertyAura from '../effects/StatueOfLibertyAura'
import TupacShakurTrigger from '../effects/TupacShakurTrigger'
import HippocraticOathTrigger from '../effects/HippocraticOathTrigger'
import HenryFordAura from '../effects/HenryFordAura'
// insert import here

export const StatStaticEffects = {
  Debt,
  Rent,
  Fervour,
  DamageReduction,
  // insert StatStaticEffect here
}

export const StaticEffects = {
  ...StatStaticEffects,
  AttackBuff,
  HealthBuff,
  AttackAndHealthBuff,
  CostReduction,
  Guard,
  Pillage,
  Rush,
  Mob,
  Snipe,
  Passionate,
  SetAttack,
  SetHealth,
  SetAttackAndHealth,
  Fortune,
  Bloodthirst,
  // insert StaticEffect here
}

export const AuraEffects = {
  FootmanAura,
  JuniorOrcAura,
  TulipManiaAura,
  SecondAmendmentAura,
  JohnTheBaptistAura,
  SlaveAura,
  SpartacusSolidarityAura,
  SelmaMarcherAura,
  StonewallRioterAura,
  TankManAura,
  GeneralStrike1926Aura,
  SpartacusGladiatorAura,
  LibraryOfAlexandriaAura,
  StatueOfLibertyAura,
  HenryFordAura,
  // insert AuraEffect here
}

export const TriggerEffects = {
  SavageWolfTrigger,
  BeveridgeReportTrigger,
  TwelveTablesTrigger,
  SingleMindedFuryTrigger,
  OrpheusTrigger,
  DavidHumeOrganiseThoughtsTrigger,
  UniversityOfOxfordTrigger,
  ThrillOfDiscoveryTrigger,
  LesMiserablesTrigger,
  NelsonMandelaTruthAndReconciliationTrigger,
  PeacefulResistanceTrigger,
  LudwigIITrigger,
  SubprimeBorrowerTrigger,
  RobespierreTrigger,
  AugusteEscoffierTrigger,
  LibraryOfAlexandriaTrigger,
  AlfredNobelTrigger,
  ThomasBodleyTrigger,
  StatueOfLibertyTrigger,
  TupacShakurTrigger,
  HippocraticOathTrigger,
  // insert TriggerEffect here
}

export const EffectExpiries = {
  ExpiresStartOfMyTurn,
  ExpiresEndOfMyTurn,
  ExpiresEndOfMyNextTurn,
  // insert EffectExpiry here
}

export const CardEffects = { ...StaticEffects, ...AuraEffects, ...TriggerEffects }

const Effects = { ...CardEffects, ...EffectExpiries }

export default Effects