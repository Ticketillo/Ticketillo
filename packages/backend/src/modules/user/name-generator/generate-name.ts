import { getRandomNumber } from "../../../common/util/random";
import nouns from "./nouns";
import adjectives from "./adjectives";
import capitalize from "../../../common/util/capitalize";

export default function generateName(): string {
    return capitalize(adjectives[getRandomNumber(0, adjectives.length - 1)]) + capitalize(nouns[getRandomNumber(0, nouns.length - 1)]);
}
