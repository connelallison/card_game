import GameObject from "../gameObjects/GameObject";
import Character from "../gameObjects/Character";

interface DamageSingleEventObject {
    objectSource: GameObject,
    charSource: Character,
    target: Character,
    value: number 
}

export default DamageSingleEventObject