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

  



  return tokens;
};
