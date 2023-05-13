import nouns from "./nouns";
import adjectives from "./adjectives";

function getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function generateName(): string {
    return capitalize(adjectives[getRandomNumber(0, adjectives.length - 1)]) + capitalize(nouns[getRandomNumber(0, nouns.length - 1)]);
}
