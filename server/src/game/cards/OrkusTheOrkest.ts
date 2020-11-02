// import Leader, { LeaderData } from '../gameObjects/Leader'
// import Game from "../gamePhases/Game";
// import GamePlayer from "../gameObjects/GamePlayer";

// const data: LeaderData = {
//   id: 'OrkusTheOrkest',
//   name: {
//     english: `Orkus the Orkest`,
//   },
//   type: 'Leader',
//   subtype: 'Leader',
//   classes: ['Empire'],
//   collectable: true,
//   cost: 2,
//   health: 5,
//   leaderTechniqueID: 'OrkusTheOrkestSmash',
//   staticText: {
//     english: `Starter`,
//   },
//   text: {
//       templates: {
//           english: `Starter`,
//       },
//   },
//   starter: true,
// }

// class OrkusTheOrkest extends Leader {
//   static readonly data: LeaderData = data
//   constructor(game: Game, owner: GamePlayer) {
//     super(game, owner, data)
//   }
// }
// export default OrkusTheOrkest