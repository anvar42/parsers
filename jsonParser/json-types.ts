export type JSONTypes = "number" | "string" | "null" | JObject | "boolean";
export type JObject = { [key: string]: string };
export type JArray = JSONTypes[];
