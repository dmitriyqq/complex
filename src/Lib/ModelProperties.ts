import { ComplexVector } from './ComplexVector';

export class ModelProperties {
    public start: ComplexVector;
    public end: ComplexVector;

    constructor(
        public matrixSize: number = 100,
        public size: number = 2.0,
        public step: number = 1.0,
        public center: ComplexVector = new ComplexVector()) {
            this.start = new ComplexVector();

            ComplexVector.getLabels().map(
              label => (this.start[label] = this.center[label] - this.size / 2)
            );

            this.end = new ComplexVector();
            ComplexVector.getLabels().map(label => (this.end[label] = this.center[label] + this.size / 2));

            this.step = this.size / this.matrixSize;
        }
}
