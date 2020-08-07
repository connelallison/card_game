import PlayerOneMinion from '../cards/PlayerOneMinion'
import PlayerTwoMinion from '../cards/PlayerTwoMinion'
import Footman from '../cards/Footman'
import RoyalGuard from '../cards/RoyalGuard'
import JuniorOrc from '../cards/JuniorOrc'
import SavageWolf from '../cards/SavageWolf'
import Fireburst from '../cards/Fireburst'
import Consume from '../cards/Consume'

const Cards = {
  PlayerOneMinion,
  PlayerTwoMinion,
  Footman,
  RoyalGuard,
  SavageWolf,
  JuniorOrc,
  Fireburst,
  Consume
}

export default Cards

// export const createCard = function (game: Game, owner: GamePlayer, zone: string, cardID: string): Card {
//   if (Cards[cardID]) {
//     return new Cards[cardID](game, owner, zone)
//   } else {
//     throw new Error(`Card "${cardID}" not found in Cards.`)
//   }
// }

// export const createMinion = function (game: Game, owner: GamePlayer, zone: string, cardID: string): Minion {
//   if (Cards[cardID]) {
//     const minion = new Cards[cardID](game, owner, zone)
//     if (minion instanceof Minion) return minion
//     throw new Error(`Card "${cardID}" is not a Minion.`)
//   } else {
//     throw new Error(`Card "${cardID}" not found in Cards.`)
//   }
// }

// const CardLib = { create, Cards } 

// export default create
