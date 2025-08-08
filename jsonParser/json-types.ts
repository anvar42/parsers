export type JObjectType = { type: "Object", value: { [key: string]: ASTNode } };
export type JStringType = { type: "String", value: string };
export type JNumberType = { type: "Number", value: number };
export type JFalseType = { type: "Boolean", value: boolean };
export type JNull = { type: "Null" };

export type ASTNode = 
    | JObjectType
    | JStringType
    | JNumberType
    | JFalseType
    | JNull
;