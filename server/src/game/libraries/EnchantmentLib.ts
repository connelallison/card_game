import FootmanExtraDamageDuringYourTurn from '../enchantments/FootmanExtraDamageDuringYourTurn'
import MinionAttackBuff from '../enchantments/MinionAttackBuff'
import MinionHealthBuff from '../enchantments/MinionHealthBuff'
import MinionAttackAndHealthBuff from '../enchantments/MinionAttackAndHealthBuff'
import Guard from '../enchantments/Guard'
import JuniorOrcAttackAura from '../enchantments/JuniorOrcAttackAura'
import SavageWolfTrigger from '../enchantments/SavageWolfTrigger'

const Enchantments = {
  FootmanExtraDamageDuringYourTurn,
  MinionAttackBuff,
  MinionHealthBuff,
  MinionAttackAndHealthBuff,
  Guard,
  JuniorOrcAttackAura,
  SavageWolfTrigger,
}

export default Enchantments

// export const createEnchantment = function (game: Game, owner: GameObject, enchantmentID: string, values: any = {}): Enchantment {
//   if (Enchantments[enchantmentID]) {
//     return new Enchantments[enchantmentID](game, owner, values)
//   } else {
//     throw new Error(`Enchantment "${enchantmentID}" not found in Enchantments.`)
//   }
// }

// export const createMinion = function (game: Game, owner: GamePlayer, zone: string, cardID: string): Minion {
//   if (Enchantments[cardID]) {
//     const minion = new Enchantments[cardID](game, owner, zone)
//     if (minion instanceof Minion) return minion
//     throw new Error(`Card "${cardID}" is not a Minion.`)
//   } else {
//     throw new Error(`Card "${cardID}" not found in Enchantments.`)
//   }
// }