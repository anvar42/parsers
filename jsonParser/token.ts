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

export type TOKEN = {
    type: TokenType;
    value: string;
}

export const tokenizer = (input: string): TOKEN[] => {
  let current = 0;
  const tokens: TOKEN[] = [];

  while (current < input.length) {
    let char = input[current];

    if (isWhitespace(char)) {
      current++;
      continue;
    }

    if (char === '{') {
      tokens.push({ type: "BraceOpen", value: char });
      current++;
      continue;
    }

    if (char === ":") {
      tokens.push({ type: "Colon", value: char });
      current++;
      continue;
    }

    if (char === ",") {
      tokens.push({ type: "Comma", value: char });
      current++;
      continue;
    }

    if (char === '"') { 
      let val = "";
      current++;
      while (input[current] !== '"') {
        val += input[current];
        current++;
      }
      tokens.push({ type: "String", value: val });
      current++;
      continue;
    }

    if (isNumber(char)) {
      let num = "";
      while(isNumber(input[current])) {
        num += input[current];
        current++;
      }
      tokens.push({ type: "Number", value: num });
      current++;
      continue;
    }

    if (char === "}") {
      tokens.push({ type: "BraceClose", value: char });
      current++;
      continue;
    }

    if (isWordOrDigit(char)) {
      let value = "";
      while (isWordOrDigit(char)) {
        value += char;
        char = input[++current];
      }

      if (isNumber(value)) tokens.push({ type: "Number", value });
      else if (isBooleanFalse(value)) tokens.push({ type: "False", value });
      else if (isBooleanTrue(value)) tokens.push({ type: "True", value });
      else if (isNull(value)) tokens.push({ type: "Null", value });
      else throw new Error("Unexpected value: " + value);

      continue;
    }
  }

  return tokens;
};

export const addToken = (tokens: TOKEN[], value: string) => {
  tokens.push({ type: "BraceOpen", value});
} 

const isWhitespace = (char: string): boolean => {
  const whitespaceChars = [' ', '\n', '\t', '\r', '\f'];
  return whitespaceChars.includes(char)
};

const isNumber = (value: string) => !isNaN(Number(value));

export const isBooleanTrue = (value: string): boolean => value === "true";
export const isBooleanFalse = (value: string): boolean => value === "false";

const isWordOrDigit = (c: string) =>
  (c >= 'a' && c <= 'z') ||
  (c >= 'A' && c <= 'Z') ||
  (c >= '0' && c <= '9') ||
  c === '_';

export const isNull = (value: string): boolean => value === "null";
