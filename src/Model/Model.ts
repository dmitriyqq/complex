import { ComplexVector } from 'src/Lib/ComplexVector';
import { Data } from 'src/Lib/Data';
import { Curve } from './Curve';

type Label = "xr" | "xi" | "yr" | "yi";
const LABELS = ["xr", "xi", "yr", "yi"];

interface IModelProperties {
  matrixSize?: number;
  size?: number
  center?: ComplexVector;
}

export default class Model {
  public matrixSize: number = 100;
  public size: number = 2.0;
  public step: number;
  public center: ComplexVector = new ComplexVector();
  public start: ComplexVector;
  public end: ComplexVector;
  public code: string;
  private data: Set<Data> = new Set();

  constructor(params: IModelProperties = {}, private curves = new Set<Curve>()) {
    this.matrixSize = params.matrixSize || 31;
    this.size = params.size || 4.0;

    LABELS.map(
      (label: Label) =>
        (this.center[label] = params.center ? params.center[label] || 0 : 0)
    );

    this.initBox();
    this.rebuild();
  }

  public exportParams = (): IModelProperties => ({
    center: this.center,
    matrixSize: this.matrixSize,
    size: this.size
  })


  // subscribe(callback) {
  //   this.onRebuild.add(callback);
  // }

  // unsubscribe(callback) {
  //   this.onRebuild.delete(callback);
  // }

  public addCurve(curve: Curve) {
    curve.index = this.curves.size;
    this.curves.add(curve);
    this.renderCurve(curve);
    this.rebuild();
  }

  public disableCurve(curve: Curve) {
    // curve = this.curves.get(curve);
    if (curve) {
      curve.disabled = true;
      this.rebuild();
    }
  }

  public removeCurve(curve: Curve) {
    this.curves.delete(curve);
    this.rebuild();
  }

  public cleanCurves() {
    this.curves.clear();
    this.rebuild();
  }

  public renderCurve(curve: Curve) {
    const data = curve.getData(this);
    // console.log(data);
    this.addData(data, curve.index);
  }

  public addData(data: any[] | any, curveIndex: number) {
    if (!(data instanceof Array)) {
      // check if point in y-boundaties
      // i think this is not necessary
      // let inBoundaries = true;
      // LABELS.map(
      //   label =>
      //     (inBoundaries &=
      //       data[label] >= this.start[label] && data[label] <= this.end[label])
      // );

      // console.log(inBoundaries);
      if (1) {
        const rastrData: any = {};
        LABELS.map(
          label =>
            (rastrData[label] = 
              (data[label] - this.start[label]) / this.step
            )
        );
        rastrData.curve = curveIndex;
        rastrData.formula = data.formula;
        rastrData.i = data.i;
        rastrData.j = data.j
        this.data.add(rastrData);
      } else {
        // console.log('not in bounds');
      }
    } else {
      // console.log("data is not a single point");
      // console.table(data);
      for (const k of data) {
        this.addData(k, curveIndex);
      }
    }
  }

  public getData() {
    return this.data;
  }

  public getCurves() {
    return this.curves;
  }


  public rebuild() {
    this.initBox();
    this.data = new Set();
    for (const curve of Array.from(this.curves)) {
      if (!curve.disabled) { this.renderCurve(curve); }
    }

    // if (this.onRebuild) {
    //   for (const callback of this.onRebuild) {
    //     callback();
    //   }
    // }
  }

  // private __debugData() {
  //   this.data.sort((a: Complex, b: Complex) => {
  //     return a.xr - b.xr != 0
  //       ? a.xr - b.xr
  //       : a.xi - b.xi != 0
  //         ? a.xi - b.xi
  //         : a.yr - b.yr != 0
  //           ? a.yr - b.yr
  //           : a.yi - b.yi;
  //   });

  //   // tslint:disable-next-line:no-console
  //   console.table(this.data);
  // }


  private initBox() {
    this.start = new ComplexVector();
    LABELS.map(
      label => (this.start[label] = this.center[label] - this.size / 2)
    );

    this.end = new ComplexVector();
    LABELS.map(label => (this.end[label] = this.center[label] + this.size / 2));

    this.step = this.size / this.matrixSize;
  }

}
