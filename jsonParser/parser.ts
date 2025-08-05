import { ASTNode } from "./json-types";
import { Token } from "./token";

export const parser = (tokens: Token[]) => {
    for (let token of tokens) {
        switch(token.type) {
            case "String":
                return { type: "String", value: token.value };
            case "Number":
                return { type: "Number", value: parseInt(token.value) };
            case "False":
                return { type: "Boolean", value: Boolean(token.value) };
            case "True":
                return { type: "Boolean", value: Boolean(token.value) };
            case "BraceOpen":
                return parseObject(tokens);
            default:
                throw new Error("Unexpected token!");
        }
    }
}

export const parseObject = (tokens: Token[]): ASTNode => {
    let cos = 1;
    const res: { [k: string]: any } = {};
    
    while (cos < tokens.length) {
        const curr = tokens[cos];
        if (curr.type === 'String') {
            cos++;
            if (tokens[cos].type !== "Colon") {
                throw new Error("Incorrect structure!");
            }
            cos++;
            if (tokens[cos].type === 'False') {
                res[curr.value] = false;
            } else if (tokens[cos].type === 'True') {
                res[curr.value] = true;
            } else if (tokens[cos].type === 'Number' || tokens[cos].type === 'Float') {
                res[curr.value] = Number(tokens[cos].value);
            } else {
                res[curr.value] = tokens[cos].value;
            }
            cos++;
            continue;
        }

        if (curr.type === "Comma") {
            cos++;
            continue;
        }

        if (curr.type === "BraceClose") {
            return res as ASTNode;
        }
    }

    return res as ASTNode;
}
