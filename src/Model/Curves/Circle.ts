import { Param } from 'src/Lib/Param';
import { Curve } from '../Curve';

export class Circle extends Curve {
    constructor(params: Param[]) {
        const formulae: string[] = [
            "((2*y0)+(0-4*((x-x0)^2-r^2))^(1/2))/2",
            "((2*y0)-(0-4*((x-x0)^2-r^2))^(1/2))/2",
        ];
        super(formulae, params);
    }
}