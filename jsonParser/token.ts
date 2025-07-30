export type TokenType = 
    | "BraceOpen"
    | "BraceClose"
    | "OpenBracket"
    | "CloseBracket"
    | "String"
    | "Colon" // ":"
    | "Number"
    | "Comma" // ","
    | "Boolean"

export type TOKEN = {
    type: TokenType;
    value: string;
}

export type Values = keyof TokenType;

export const tokenizer = (input: string) => {
    let position = 0;
    const tokens: TOKEN[] = [];

    while (position < input.length) {
        let char = input[position];

        if (char === "{") {
            tokens.push({ type: "BraceOpen", value: char });
            position++;
            continue;
        }

        if (char === '}') {
            if (input.length !== position) {
                throw new Error("Do not completed yet")
            }
        }
    }
}


// "name", "na-mae"
export const makeString = (input: string) => {
    const ch = input.split('"');
    let res = "";
    let position = 0;

    if (!/[a-z]/.test(input[position])) {
        throw new Error();
    }

    res += input[position];

    return res;
}

tokenizer(` { "name": "john", "age": 12 } `)