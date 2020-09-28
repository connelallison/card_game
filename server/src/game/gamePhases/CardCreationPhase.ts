// import GameEvent from "./GameEvent";
// import EventPhase from "./EventPhase";

// interface CardCreationEventObject {
//     player: GamePlayer
//     card: Card
// }

// export class CardCreationEvent extends GameEvent {
//     player: GamePlayer
//     card: Card

//     constructor(game: Game, object: CardCreationEventObject) {
//         super(game) 
//         Object.assign(this, object)
//     }

//     generateLog() {
//         // this.log = `${this.player.playerName} spends ${this.money} money on ${this.card.name.english}.`
//     }
// }

// class CardCreationPhase extends EventPhase {
//     parent: EventPhase
//     event: CardCreationEvent

//     constructor(parent: EventPhase, event: CardCreationEvent) {
//         super(parent, event)
//     }

//     start(): void {
//         const event = this.event

//         this.end()
//     }


// }

// export default CardCreationPhase

// import GamePlayer from "../gameObjects/GamePlayer";
// import Card from "../gameObjects/Card";
// import Game from "./Game";