import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";

interface DamageMultipleEventObject {
    objectSource: GameObject,
    charSource: Character,
    targets: Character[],
    damage: number 
}

export default DamageMultipleEventObject