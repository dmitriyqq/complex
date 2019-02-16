import { Param } from 'src/Lib/Param';
import { Parser } from 'src/Lib/Parser';
import { Curve } from '../Curves';

export class Line extends Curve {
    constructor(params: Param[]) {
        const parser = new Parser();
        const formula = [parser.eval("A*x+B")];
        super(formula, params);
    }
}