import { Complex } from './Complex';

export type Dimension = 'xr' | 'xi' | 'yr' | 'yi'

export class ComplexVector {
    public static getLabels = (): Dimension[] => [
        'xr', 'xi', 'yr', 'yi'
    ];

    public xr: number = 0;
    public xi: number = 0;
    public yr: number = 0;
    public yi: number = 0;

    public toString() {
        return `(${new Complex(0, 0)}, ${new Complex(0, 0)})`;
    }
}
