export type JObjectType = { type: "Object", value: Object };
export type JStringType = { type: "String", value: string };
export type JNumberType = { type: "Number", value: number };
export type JFalseType = { type: "False", value: boolean };
export type JTrueType = { type: "True", value: boolean };

export type ASTNode = 
    | JObjectType
    | JStringType
    | JNumberType
    | JTrueType
    | JFalseType
;