import Complex from './Complex';
import { Node } from './Node';
import { TokenTypes } from './Parser';

export class Formula {
    private params: Map<string, Complex>;

    constructor(public root: Node, public text: string) {
        this.params = new Map<string, Complex>();

        const params = this._getParams(this.root);
        for (const param of params) {
            this.params[param] = new Complex(0, 0);
        }
    }

    public setVariable(param: string, val: Complex) {
        this.params[param] = val;
    }

    public getParams() {
        return this.params;
    }

    public getParam(paramName: string) {
        return this.params[paramName];
    }

    public calc(node?: Node): Complex {
        try {
            if (!node) {
                node = this.root;
            }

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
                return this.params[node.token.val];
            }

            return new Complex();
        } catch (err) {
            return new Complex();
        }

    }

    public _getParams(node: Node): string[] {
        let params: string[] = [];
        if (node.token.type === TokenTypes.OPERATION) {
            params = params.concat(this._getParams(node.left));
            params = params.concat(this._getParams(node.right));
            return params;
        } else if (node.token.type === TokenTypes.PARAMETR) {
            if (node.token.val !== "x") { params.push(node.token.val); }
        }
        return params;
    }

    public getParamNames(): string[] {
        let params = this._getParams(this.root);
        const ans: string[] = [];
        params = params.filter(x => {
            if (ans.indexOf(x) === -1) {
                ans.push(x);
                return true;
            } else { return false; }
        });

        return params;
    }
}