import Card from "../gameObjects/Card";

interface PlayRequirement {
    (card: Card): boolean
}

export default PlayRequirement