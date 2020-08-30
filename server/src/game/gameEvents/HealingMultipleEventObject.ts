import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";

interface HealMultipleEventObject {
    objectSource: GameObject,
    charSource: Character,
    targets: Character[],
    healing: number 
}

export default HealMultipleEventObject