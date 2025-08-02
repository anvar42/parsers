import { tokenizer } from "./token"

function main() {
    const input = ' {"name": "John", "city": "New York", "age": 54}';
    const tokens = tokenizer(input);

    console.log(tokens);
    
}

main();
