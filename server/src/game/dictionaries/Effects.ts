import Guard from '../effects/Guard'
import Pillage from '../effects/Pillage'
import Rush from '../effects/Rush'
import FootmanAura from '../effects/FootmanAura'
import AttackBuff from '../effects/AttackBuff'
import HealthBuff from '../effects/HealthBuff'
import AttackAndHealthBuff from '../effects/AttackAndHealthBuff'
import JuniorOrcAura from '../effects/JuniorOrcAura'
import SavageWolfTrigger from '../effects/SavageWolfTrigger'
import HolyBookTrigger from '../effects/HolyBookTrigger'
import KnightAcademyTrigger from '../effects/KnightAcademyTrigger'
import HolyProtectorsAura from '../effects/HolyProtectorsAura'
import SingleMindedFuryTrigger from  '../effects/SingleMindedFuryTrigger'
import CombatTrainingAura from '../effects/CombatTrainingAura'
import ExpiresStartOfMyTurn from '../effects/ExpiresStartOfMyTurn'
import Debt from '../effects/Debt'
import Rent from '../effects/Rent'
import Fervour from '../effects/Fervour'
import ExpiresEndOfMyTurn from '../effects/ExpiresEndOfMyTurn'
import OrpheusTrigger from '../effects/OrpheusTrigger'
import JohnTheBaptistAura from '../effects/JohnTheBaptistAura'

export const StatStaticEffects = {
  Debt,
  Rent,
  Fervour,
}

export const StaticEffects = Object.assign({
  AttackBuff,
  HealthBuff,
  AttackAndHealthBuff,
  Guard,
  Pillage,
  Rush,
}, StatStaticEffects)

export const AuraEffects = {
  FootmanAura,
  JuniorOrcAura,
  HolyProtectorsAura,
  CombatTrainingAura,
  JohnTheBaptistAura,
}

export const TriggerEffects = {
  SavageWolfTrigger,
  HolyBookTrigger,
  KnightAcademyTrigger,
  SingleMindedFuryTrigger,
  OrpheusTrigger
}

export const EffectExpiries = {
  ExpiresStartOfMyTurn,
  ExpiresEndOfMyTurn,
}

export const CardEffects = Object.assign({}, StaticEffects, AuraEffects, TriggerEffects)

const Effects = Object.assign({}, CardEffects, EffectExpiries)

export default Effects