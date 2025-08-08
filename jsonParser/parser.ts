import { ASTNode } from "./json-types";
import { Token } from "./token";

interface ParserState {
    tokens: Token[];
    current: number;
}

const peek = (state: ParserState): Token => {
    return state.tokens[state.current];
};

const advance = (state: ParserState): ParserState => {
    return {
        ...state,
        current: state.current + 1
    };
};

const isAtEnd = (state: ParserState): boolean => {
    return state.current >= state.tokens.length;
};

interface ParseResult {
    node: ASTNode;
    state: ParserState;
}

export const parser = (tokens: Token[]): ASTNode => {
    if (!tokens.length) {
        throw new Error("Nothing to parse. Exiting!");
    }

    const initialState: ParserState = { tokens, current: 0 };
    const result = parseValue(initialState);
    
    return result.node;
};

export const parseValue = (state: ParserState): ParseResult => {
    if (isAtEnd(state)) {
        throw new Error("Unexpected end of tokens");
    }

    const token = peek(state);
    
    switch (token.type) {
        case "String":
            return {
                node: { type: "String", value: token.value },
                state: advance(state)
            };
        case "Number":
            return {
                node: { type: "Number", value: Number(token.value) },
                state: advance(state)
            };
        case "True":
            return {
                node: { type: "Boolean", value: true },
                state: advance(state)
            };
        case "False":
            return {
                node: { type: "Boolean", value: false },
                state: advance(state)
            };
        case "Null":
            return {
                node: { type: "Null" },
                state: advance(state)
            };
        case "BraceOpen":
            return parseObject(state);
        default:
            throw new Error(`Unexpected token type: ${token.type}`);
    }
};

export const parseObject = (state: ParserState): ParseResult => {
    if (peek(state).type !== "BraceOpen") {
        throw new Error("Expected '{' at start of object");
    }
    let currentState = advance(state);

    const node: ASTNode = { type: "Object", value: {} };

    if (peek(currentState).type === "BraceClose") {
        return {
            node,
            state: advance(currentState)
        };
    }

    while (true) {
        if (peek(currentState).type !== "String") {
            throw new Error(`Expected String key in object. Got: ${peek(currentState).type}`);
        }
        const key = peek(currentState).value;
        currentState = advance(currentState);

        if (peek(currentState).type !== "Colon") {
            throw new Error("Expected ':' after key in object");
        }
        currentState = advance(currentState);

        const valueResult = parseValue(currentState);
        node.value[key] = valueResult.node;
        currentState = valueResult.state;

        if (isAtEnd(currentState)) {
            throw new Error("Unexpected end of tokens in object");
        }

        const nextToken = peek(currentState);
        if (nextToken.type === "BraceClose") {
            currentState = advance(currentState);
            break;
        } else if (nextToken.type === "Comma") {
            currentState = advance(currentState);
        } else {
            throw new Error(`Expected ',' or '}' in object. Got: ${nextToken.type}`);
        }
    }

    return { node, state: currentState };
};

export const parseObjectTokens = (tokens: Token[]): ASTNode => {
    const state: ParserState = { tokens, current: 0 };
    return parseObject(state).node;
};

export const parseValueTokens = (tokens: Token[]): ASTNode => {
    const state: ParserState = { tokens, current: 0 };
    return parseValue(state).node;
};