import { ComplexVector } from 'src/Lib/ComplexVector';
import { Data } from 'src/Lib/Data';
import { ModelProperties } from 'src/Lib/ModelProperties';
import { Curve } from 'src/Model/Curve';
import { XValue } from '../Lib/XValue';


export class Model {
  public properties: ModelProperties = new ModelProperties();
  public curves: Curve[] = [];

  public build(): Data[] {
    const time = Date.now();
    const xArray: XValue[] = [];

    const {start, step, matrixSize} = this.properties;

    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        const v = new XValue();

        v.re = start.xr + step * i + step / 2;
        v.im = start.xi + step * j + step / 2;
        v.i = i;
        v.j = j;

        xArray.push(v);
      }
    }

    let data: Data[] = [];
    for (const curve of this.curves) {
      data = data.concat(curve.getData(xArray).map(this.discretize));
    }

    // tslint:disable-next-line:no-console
    console.error(`time build: `, Date.now() - time, `ms`);
    return data;
  }

  private discretize = (data: Data): Data => {
    const {step, start} = this.properties
    ComplexVector.getLabels().map(
      label =>
        (data[label] = 
          (data[label] - start[label]) / step
        )
    );
    return data;
  }
}
