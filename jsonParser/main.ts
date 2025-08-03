import { tokenizer } from "./token"

function main() {
    const input = `{
        "name": "Lorem",
        "age": 30,
        "isDev": true,
        "skills": null
      }`;
      
      console.log(tokenizer(input));
}

main();
