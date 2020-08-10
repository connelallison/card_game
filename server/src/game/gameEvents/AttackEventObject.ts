import Character from "../gameObjects/Character";

interface AttackEventObject {
    attacker: Character,
    defender: Character,
}

export default AttackEventObject