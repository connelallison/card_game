import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";

interface HealSingleEventObject {
    objectSource: GameObject,
    charSource: Character,
    target: Character,
    healing: number 
}

export default HealSingleEventObject