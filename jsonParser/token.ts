export type TokenType =
  | "BraceOpen"
  | "BraceClose"
  | "String"
  | "Number"
  | "Comma"
  | "Colon"
  | "True"
  | "False"
  | "Null";

export type Token = {
    type: TokenType;
    value: string;
}

export interface TokenHandler {
  tokenize: (input: string, i: number) => boolean;
  consumeToken: (input: string, i: number) => { token: Token; nextIndex: number };
}

const createSymbolHandler = (char: string, type: Token['type']): TokenHandler => ({
  tokenize: (input, i) => input[i] === char,
  consumeToken: (_, i) => ({ token: { type, value: char } as Token, nextIndex: i + 1 })
});

const createLiteralHandler = <T extends Token['type']>(literal: string, type: T): TokenHandler => ({
  tokenize: (input, i) => input.slice(i, i + literal.length) === literal,
  consumeToken: (_, i) => ({ token: { type, value: literal } as Token, nextIndex: i + literal.length })
});

const numberHandler: TokenHandler = {
  tokenize: (input, i) => isNumber(input[i]),
  consumeToken: (input, i) => {
    let numStr = '';
    while (i < input.length && isNumber(input[i])) {
      numStr += input[i++];
    }
    return { token: { type: 'Number', value: numStr }, nextIndex: i };
  }
};

const stringHandler: TokenHandler = {
  tokenize: (input, i) => input[i] === '"',
  consumeToken: (input, i) => {
    i++;
    let result = "";

    while (input[i] !== '"') {
      result += input[i];
      i++;
    }

    return { token: { type: 'String', value: result }, nextIndex: i + 1 };
  }
}

const handlers: TokenHandler[] = [
  createSymbolHandler('{', 'BraceOpen'),
  createSymbolHandler('}', 'BraceClose'),
  createSymbolHandler(':', 'Colon'),
  createSymbolHandler(',', 'Comma'),
  createLiteralHandler('true', 'True'),
  createLiteralHandler('false', 'False'),
  createLiteralHandler('null', 'Null'),
  numberHandler,
  stringHandler
];


export function tokenizer(input: string): Token[] {
  let current = 0;
  const tokens: Token[] = [];

  while (current < input.length) {
    if (isWhitespace(input[current])) {
      current++;
      continue;
    }

    const handler = handlers.find(h => h.tokenize(input, current));

    if (!handler) throw new Error(`Unexpected character '${input[current]}' at position ${current}`);

    const { token, nextIndex } = handler.consumeToken(input, current);
    tokens.push(token);
    current = nextIndex;
  }

  return tokens;
}

const isWhitespace = (char: string): boolean => {
  const whitespaceChars = [' ', '\n', '\t', '\r', '\f'];
  return whitespaceChars.includes(char)
};

const isNumber = (value: string) => !isNaN(Number(value));

export const isBooleanTrue = (value: string): boolean => value === "true";
export const isBooleanFalse = (value: string): boolean => value === "false";

export const isWordOrDigit = (c: string) =>
  (c >= 'a' && c <= 'z') ||
  (c >= 'A' && c <= 'Z') ||
  (c >= '0' && c <= '9') ||
  c === '_';

export const isNull = (value: string): boolean => value === "null";
