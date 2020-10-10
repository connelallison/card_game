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
import CitizenAcademyTrigger from '../effects/CitizenAcademyTrigger'
import TulipManiaAura from '../effects/TulipManiaAura'
import SingleMindedFuryTrigger from  '../effects/SingleMindedFuryTrigger'
import CombatTrainingAura from '../effects/CombatTrainingAura'
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

export const StatStaticEffects = {
  Debt,
  Rent,
  Fervour,
  DamageReduction,
}

export const StaticEffects = {
  AttackBuff,
  HealthBuff,
  AttackAndHealthBuff,
  CostReduction,
  Guard,
  Pillage,
  Rush,
  Mob,
  ...StatStaticEffects,
}

export const AuraEffects = {
  FootmanAura,
  JuniorOrcAura,
  TulipManiaAura,
  CombatTrainingAura,
  JohnTheBaptistAura,
  SlaveAura,
  SpartacusSolidarityAura,
}

export const TriggerEffects = {
  SavageWolfTrigger,
  BeveridgeReportTrigger,
  CitizenAcademyTrigger,
  SingleMindedFuryTrigger,
  OrpheusTrigger
}

export const EffectExpiries = {
  ExpiresStartOfMyTurn,
  ExpiresEndOfMyTurn,
}

export const CardEffects = { ...StaticEffects, ...AuraEffects, ...TriggerEffects}

const Effects = { ...CardEffects, ...EffectExpiries }

export default Effects