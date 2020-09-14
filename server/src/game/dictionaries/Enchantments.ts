import Guard from '../enchantments/Guard'
import Pillage from '../enchantments/Pillage'
import Rush from '../enchantments/Rush'
import FootmanAura from '../enchantments/FootmanAura'
import AttackBuff from '../enchantments/AttackBuff'
import HealthBuff from '../enchantments/HealthBuff'
import AttackAndHealthBuff from '../enchantments/AttackAndHealthBuff'
import JuniorOrcAura from '../enchantments/JuniorOrcAura'
import SavageWolfTrigger from '../enchantments/SavageWolfTrigger'
import HolyBookTrigger from '../enchantments/HolyBookTrigger'
import KnightAcademyTrigger from '../enchantments/KnightAcademyTrigger'
import HolyProtectorsAura from '../enchantments/HolyProtectorsAura'
import SingleMindedFuryTrigger from  '../enchantments/SingleMindedFuryTrigger'
import CombatTrainingAura from '../enchantments/CombatTrainingAura'
import ExpiresStartOfMyTurn from '../enchantments/ExpiresStartOfMyTurn'
import Debt from '../enchantments/Debt'
import Rent from '../enchantments/Rent'
import Fervour from '../enchantments/Fervour'
import ExpiresEndOfMyTurn from '../enchantments/ExpiresEndOfMyTurn'

export const StatStaticEnchantments = {
  Debt,
  Rent,
  Fervour,
}

export const StaticEnchantments = Object.assign({
  AttackBuff,
  HealthBuff,
  AttackAndHealthBuff,
  Guard,
  Pillage,
  Rush,
}, StatStaticEnchantments)

export const AuraEnchantments = {
  FootmanAura,
  JuniorOrcAura,
  HolyProtectorsAura,
  CombatTrainingAura,
}

export const TriggerEnchantments = {
  SavageWolfTrigger,
  HolyBookTrigger,
  KnightAcademyTrigger,
  SingleMindedFuryTrigger,
}

export const EnchantmentExpiries = {
  ExpiresStartOfMyTurn,
  ExpiresEndOfMyTurn,
}

export const CardEnchantments = Object.assign({}, StaticEnchantments, AuraEnchantments, TriggerEnchantments)

const Enchantments = Object.assign({}, CardEnchantments, EnchantmentExpiries)

export default Enchantments