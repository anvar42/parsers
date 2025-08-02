export type JObjectType = { type: "Object", value: Object };
export type JStringType = { type: "String", value: string };
export type JNumberType = { type: "Number", value: number };
export type JBooleanType = { type: "Boolean", value: boolean };

export type ASTNode = 
    | JObjectType
    | JObjectType
    | JNumberType
    | JBooleanType
;