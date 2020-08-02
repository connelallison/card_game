import PlayerOneMinion from './cards/PlayerOneMinion'
import PlayerTwoMinion from './cards/PlayerTwoMinion'
import Footman from './cards/Footman'
import RoyalGuard from './cards/RoyalGuard'
import JuniorOrc from './cards/JuniorOrc'
import Fireburst from './cards/Fireburst'
import Consume from './cards/Consume'
import Game from './Game'
import GamePlayer from './GamePlayer'
import Card from './Card'

const Cards = {
  PlayerOneMinion,
  PlayerTwoMinion,
  Footman,
  RoyalGuard,
  JuniorOrc,
  Fireburst,
  Consume
}

export const create = function (game: Game, owner: GamePlayer, zone: string, cardID: string): Card {
  if (Cards[cardID]) {
    return new Cards[cardID](game, owner, zone)
  } else {
    throw new Error(`Card "${cardID}" not found in Cards.`)
  }
}

// const CardLib = { create, Cards } 

// export default create
