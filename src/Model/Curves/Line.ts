import { Param } from 'src/Lib/Param';
import { Curve } from '../Curve';

export class Line extends Curve {
    constructor(params?: Param[]) {
        const formula = ["A*x+B"];
        super(formula, params);
    }
}