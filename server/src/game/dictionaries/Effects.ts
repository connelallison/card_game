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
import RomanSlaveAura from '../effects/RomanSlaveAura'
import ImSpartacusAura from '../effects/ImSpartacusAura'
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
import SpartacusBrokenChainsAura from '../effects/SpartacusBrokenChainsAura'
import RobespierreTrigger from '../effects/RobespierreTrigger'
import AugusteEscoffierTrigger from '../effects/AugusteEscoffierTrigger'
import LibraryOfAlexandriaTrigger from '../effects/LibraryOfAlexandriaTrigger'
import AlfredNobelTrigger from '../effects/AlfredNobelTrigger'
import ThomasBodleyTrigger from '../effects/ThomasBodleyTrigger'
import StatueOfLibertyTrigger from '../effects/StatueOfLibertyTrigger'
import StatueOfLibertyAura from '../effects/StatueOfLibertyAura'
import TupacShakurTrigger from '../effects/TupacShakurTrigger'
import HippocraticOathTrigger from '../effects/HippocraticOathTrigger'
import HenryFordAura from '../effects/HenryFordAura'
import RansomEOldsAura from '../effects/RansomEOldsAura'
import Repeatable from '../effects/Repeatable'
import VenetianPatentStatuteTrigger from '../effects/VenetianPatentStatuteTrigger'
import HelotTrigger from '../effects/HelotTrigger'
import NikaHooliganTrigger from '../effects/NikaHooliganTrigger'
import Immune from '../effects/Immune'
import ArchimedesBuff from '../effects/ArchimedesBuff'
import GrandeArmeeTrigger from '../effects/GrandeArmeeTrigger'
import MutuallyAssuredDestructionTrigger from '../effects/MutuallyAssuredDestructionTrigger'
import HenryVIIIMoreWivesYourGraceTrigger from '../effects/HenryVIIIMoreWivesYourGraceTrigger'
import TheodoraTrigger from '../effects/TheodoraTrigger'
import WuZetianTrigger from '../effects/WuZetianTrigger'
import GulagTrigger from '../effects/GulagTrigger'
import Collateral from '../effects/Collateral'
import Rot from '../effects/Rot'
import KunstoffizierTrigger from '../effects/KunstoffizierTrigger'
import DebuffAttack from '../effects/DebuffAttack'
import DebuffHealth from '../effects/DebuffHealth'
import DebuffAttackAndHealth from '../effects/DebuffAttackAndHealth'
import CostIncrease from '../effects/CostIncrease'
import SetCost from '../effects/SetCost'
import GeorgeMarshallAura from '../effects/GeorgeMarshallAura'
import AneurinBevanTrigger from '../effects/AneurinBevanTrigger'
import TractorTrigger from '../effects/TractorTrigger'
import CharlesPonziTrigger from '../effects/CharlesPonziTrigger'
import UnpersonEffect from '../effects/UnpersonEffect'
import Lethal from '../effects/Lethal'
import SamuelColtAura from '../effects/SamuelColtAura'
import EconomiesOfScaleTrigger from '../effects/EconomiesOfScaleTrigger'
import EconomiesOfScaleAura from '../effects/EconomiesOfScaleAura'
import SupercontangoEffect from '../effects/SupercontangoEffect'
import IsaacLeMaireTrigger from '../effects/IsaacLeMaireTrigger'
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
  Repeatable,
  Immune,
  ArchimedesBuff,
  Collateral,
  Rot,
  DebuffAttack,
  DebuffHealth,
  DebuffAttackAndHealth,
  CostIncrease,
  SetCost,
  UnpersonEffect,
  Lethal,
  SupercontangoEffect,
  // insert StaticEffect here
}

export const AuraEffects = {
  FootmanAura,
  JuniorOrcAura,
  TulipManiaAura,
  SecondAmendmentAura,
  JohnTheBaptistAura,
  RomanSlaveAura,
  ImSpartacusAura,
  SelmaMarcherAura,
  StonewallRioterAura,
  TankManAura,
  GeneralStrike1926Aura,
  SpartacusBrokenChainsAura,
  StatueOfLibertyAura,
  HenryFordAura,
  RansomEOldsAura,
  GeorgeMarshallAura,
  SamuelColtAura,
  EconomiesOfScaleAura,
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
  VenetianPatentStatuteTrigger,
  HelotTrigger,
  NikaHooliganTrigger,
  GrandeArmeeTrigger,
  MutuallyAssuredDestructionTrigger,
  HenryVIIIMoreWivesYourGraceTrigger,
  TheodoraTrigger,
  WuZetianTrigger,
  GulagTrigger,
  KunstoffizierTrigger,
  AneurinBevanTrigger,
  TractorTrigger,
  CharlesPonziTrigger,
  EconomiesOfScaleTrigger,
  IsaacLeMaireTrigger,
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