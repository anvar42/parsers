import { parser } from "./parser";
import { tokenizer } from "./token"

export function main(input: string) {
    const tokens = tokenizer(input);

    const parse = parser(tokens);

    return parse;
}

const input = '{"age": 30, "height": 1.8}';

console.log(main(input));