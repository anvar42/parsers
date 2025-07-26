export class JSONParser {
  private input: string;
  private pos: number = 0;

  constructor(input: string) {
    this.input = input.trim();
  }

  parse(): any {
    this.skipWhitespace();

    if (this.input[this.pos] === '{') {
      this.pos++;
      this.skipWhitespace();

      if (this.input[this.pos] === '}') {
        this.pos++;
        return {};
      } else {
        throw new Error("Only empty object supported right now");
      }
    }

    throw new Error("Invalid JSON");
  }

  private skipWhitespace() {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }
}

console.log(new JSONParser("{}"));
