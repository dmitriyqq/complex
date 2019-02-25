import { Complex } from './Complex';
import { Node } from './Node';
import { TokenTypes } from './Parser';

export class Formula {
    public params: any = {};

    constructor(public root: Node, public text: string) {}

    public calc(node?: Node): Complex {
        try {
            node = node ? node : this.root;

            if (node.token.type === TokenTypes.OPERATION) {
                let operandA: any = this.calc(node.left);
                let operandB: any = this.calc(node.right);

                if (!(operandA instanceof Complex)) {
                    operandA = new Complex(operandA.re, operandA.im);
                }

                if (!(operandB instanceof Complex)) {
                    operandB = new Complex(operandB.re, operandB.im);
                }

                switch (node.token.val) {
                    case "+":
                        return operandA.add(operandB);
                    case "-":
                        return operandA.sub(operandB);
                    case "/":
                        return operandA.divide(operandB);
                    case "*":
                        return operandA.mult(operandB);
                    case "^":
                        return operandA.pow(operandB);
                }
            } else if (node.token.type === TokenTypes.NUMBER) {
                return node.token.val as Complex;
            } else if (node.token.type === TokenTypes.PARAMETR) {
                return this.getParam(node.token.val);
            }

            return new Complex();
        } catch (err) {
            return new Complex();
        }

    }

    public getParamNames(node?: Node): Set<string> {
        node = node ? node : this.root;
        let params: Set<string> = new Set();
        if (node.token.type === TokenTypes.OPERATION) {
            params = new Set([...this.getParamNames(node.left), ...this.getParamNames(node.right)]);
        } else if (node.token.type === TokenTypes.PARAMETR) {
            params.add(node.token.val);
        }
        return params;
    }

    public setParam(param: string, val: Complex) {
        this.params[param] = val;
    }

    public getParam(param: string): Complex {
        return this.params[param] || new Complex();
        // if (this.params.has(param)) {
            // return this.params.get(param) as Complex;
        // } else {
            // tslint:disable-next-line:no-console
            // console.warn(`No value for param ${param} specified, assuming zero`);
            // return new Complex();
        // }
    }
}