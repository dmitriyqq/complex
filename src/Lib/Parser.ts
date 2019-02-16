import Complex from "./Complex";
import { Formula } from './Formula';
import { Node } from './Node';
import { Token } from './Token';

export const TokenTypes = Object.freeze({
  CLOSE_PAR: 4,
  INVALID: 5,
  NUMBER: 2,
  OPEN_PAR: 3,
  OPERATION: 0,
  PARAMETR: 1,
});

function isSingleCharToken(str: string, startPos: number) {
  switch (str[startPos]) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "^":
      return {
        next: startPos + 1,
        token: { type: TokenTypes.OPERATION, val: str[startPos] },
      };
    case "(":
      return {
        next: startPos + 1,
        token: { type: TokenTypes.OPEN_PAR, val: str[startPos] },
      };
    case ")":
      return {
        next: startPos + 1,
        token: { type: TokenTypes.CLOSE_PAR, val: str[startPos] },
      };
    default:
      return {
        next: startPos,
        token: { type: TokenTypes.INVALID, val: null },
      };
  }
}

function tryInt(str: string, startPos: number) {
  const allDigits = "0123456789";
  let num = 0;
  let i;
  for (
    i = startPos;
    i < str.length && allDigits.indexOf(str[i]) !== -1;
    i++
  ) {
    num *= 10;
    num += parseInt(str[i], 10);
  }

  return {
    next: i,
    num: i !== startPos ? num : NaN,
  };
}

function isNumber(str: string, startPos: number) {
  const intPart = tryInt(str, startPos);
  startPos = intPart.next;

  if (!isNaN(intPart.num)) {
    let real = intPart.num;
    let num;
    if (str[startPos] === ".") {
      startPos++;
      const floatPart = tryInt(str, startPos);
      if (!isNaN(floatPart.num)) {
        real = parseFloat(intPart.num + "." + floatPart.num);
      } else {
        real = intPart.num;
      }
      startPos = floatPart.next;
    }

    if (str[startPos] === "i") {
      startPos++;
      num = new Complex(0, real);
    } else {
      num = new Complex(real, 0);
    }

    return {
      next: startPos,
      token: { type: TokenTypes.NUMBER, val: num },
    };
  } else {
    return {
      next: startPos,
      token: { type: TokenTypes.INVALID, val: null },
    };
  }
}

function isParametr(str: string, startPos: number) {
  function isalpha(c: string) {
    return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
  }
  function isdigit(c: string) {
    return c >= "0" && c <= "9";
  }
  function isalnum(c: string) {
    return isalpha(c) || isdigit(c);
  }

  let parametr = "";
  let j = startPos;
  for (let i = startPos; i < str.length && isalnum(str[i]); i++) {
    parametr += str[i];
    j++;
  }

  if (parametr.length) {
    return {
      next: j,
      token: { type: TokenTypes.PARAMETR, val: parametr },
    };
  } else {
    return {
      next: startPos,
      token: { type: TokenTypes.INVALID, val: null },
    };
  }
}

export class Parser {
  public tokenize(str: string) {
    str = str.split(" ").join("");
    let i = 0;
    const tokens = [];
    const reducers = [isSingleCharToken, isNumber, isParametr];
    while (i < str.length) {
      let isReduced = false;
      // console.log(str.substring(i));
      for (const reducer of reducers) {
        const token = reducer(str, i);
        // console.log(token);
        if (token.token.type !== TokenTypes.INVALID) {
          isReduced = true;
          i = token.next;
          tokens.push(token.token);
          break;
        }
      }

      if (!isReduced) {
        throw new Error("Unknown type of token");
      }
    }

    return tokens;
  }

  public tryBinaryOperator(operators: string, tokens: Token[]): Node | null {
    let level = 0;
    for (let i = tokens.length - 1; i >= 0; i--) {
      if (level === 0 && tokens[i].type === TokenTypes.OPERATION && operators.indexOf(tokens[i].val) !== -1) {
        return {
          left: this.buildTree(tokens.slice(0, i)),
          right: this.buildTree(tokens.slice(i + 1)),
          token: tokens[i],
        };
      } else if (tokens[i].type === TokenTypes.OPEN_PAR) {
        level++;
      } else if (tokens[i].type === TokenTypes.CLOSE_PAR) {
        level--;
      }
    }
    return null;
  }

  public ruleSum(tokens: Token[]) {
    return this.tryBinaryOperator("+-", tokens);
  }

  public ruleMul(tokens: Token[]) {
    return this.tryBinaryOperator("*/", tokens);
  }

  public rulePow(tokens: Token[]) {
    return this.tryBinaryOperator("^", tokens);
  }

  public rulePar(tokens: Token[]) {
    if (tokens[0].type === TokenTypes.OPEN_PAR) {
      return this.buildTree(tokens.slice(1, tokens.length - 1));
    } else { return null; }
  }

  public atom(tokens: Token[]) {
    if (
      (tokens.length === 1 && tokens[0].type === TokenTypes.PARAMETR) ||
      tokens[0].type === TokenTypes.NUMBER
    ) {
      return {
        token: tokens[0]
      };
    } else {
      return null;
    }
  }

  public buildTree(tokens: Token[]) {
    const rules = [
      this.ruleSum.bind(this),
      this.ruleMul.bind(this),
      this.rulePow.bind(this),
      this.rulePar.bind(this),
      this.atom.bind(this)
    ];

    for (const rule of rules) {
      const node = rule(tokens);
      if (node != null) {
        return node;
      }
    }

    throw new Error("Unknown rule");
  }

  public eval(expression: string): Formula {
      const tokens = this.tokenize(expression);
      const root = this.buildTree(tokens);
      return new Formula(root, expression);
  }
}
