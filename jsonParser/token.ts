export type TokenType = 
    | "OpenBrace"
    | "CloseBrace"
    | "OpenBracket"
    | "CloseBracket"

export type TOKEN = {
    type: TokenType;
    value: string;
}

export const tokenizer = (input: string) => {

}