import { Param } from 'src/Lib/Param';
import { Parser } from "src/Lib/Parser";
import { Curve } from '../Curve';

export class Circle extends Curve {
    constructor(params: Param[]) {
        const parser = new Parser();
        const formula = [
            parser.eval("((2*y0)+(0-4*((x-x0)^2-r^2))^(1/2))/2"),
            parser.eval("((2*y0)-(0-4*((x-x0)^2-r^2))^(1/2))/2")
        ];
        super(formula, params);
    }
}