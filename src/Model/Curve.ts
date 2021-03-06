// import { Complex } from "src/Lib/Complex";
import { Data } from 'src/Lib/Data';
import { Formula } from 'src/Lib/Formula';
import { Param } from 'src/Lib/Param';
import { Parser } from 'src/Lib/Parser';
import { XValue } from 'src/Lib/XValue';

export class Curve {
  public params: any = {};

  constructor(public formulae: string[], params?: Param[]) {
    if (params) {
      for (const param of params) {
        this.params[param.name] = param.value;
      }
    }
  }

  public getParamNames(): Set<string> {
    const formulae = this.parseFormulae();
    let params: Set<string> = new Set();

    for (const formula of formulae) {
        params = new Set([...params, ...formula.getParamNames()]);
    }

    return params;
  }

  public getData(xArray: XValue[]): Data[] {
    const formulae = this.parseFormulae();

    const data: Data[] = [];

    for (const x of xArray) {
      const {i, j} = x;
      this.params.x = x;
      let formulaIndex = 0;

      for (const formula of formulae) {
        formula.params = this.params;

        const y = formula.calc();
        data.push({ i, j, xr: x.re, xi: x.im, yr: y.re, yi: y.im, formula: formulaIndex++});
      }
    }

    return data;
  }

  private parseFormulae(): Formula[] {
    const parser = new Parser();
    return this.formulae.map((text: string) => parser.eval(text));
  }
}

// export class Parabola extends Curve {
//   constructor(params) {
//     const formula = [GlobalParser.eval("A*x^2")];
//     super(formula, params);
//   }
// }

// export class Hyperbola extends Curve {
//   constructor(params) {
//     const formula = [GlobalParser.eval("A / x")];
//     super(formula, params);
//   }
// }

// export class Hyperbola2 extends Curve {
//   constructor(params) {
//     const formula = [
//       GlobalParser.eval("((b*x/a)^2-b^2)^(1/2)"),
//       GlobalParser.eval("0-((b*x/a)^2-b^2)^(1/2)")
//     ];
//     super(formula, params);
//   }
// }

// const Curves = [
  // { name: "Окружность", curve: Circle },
  // { name: "Гипербола", curve: Hyperbola },
  // { name: "Прямая", curve: Line },
  // { name: "Парабола", curve: Parabola }
// ];

// export default Curves;

// export class UCurve {
//   constructor(formula, params) {
//     this.color = {
//       r: Math.round(255 * Math.random()),
//       g: Math.round(255 * Math.random()),
//       b: Math.round(255 * Math.random())
//     };

//     this.formula = "x*x + y*y = r*r";

//     const need_params = this.formula.getParamNames();
//     for (let param of need_params) {
//       for (let func of this.y) {
//         func.setVariable(param, new Complex(0, 0));
//       }
//     }
//     if (params)
//       for (let param of params) {
//         this.setParam(param.label, param.value);
//       }
//   }

//   getParamNames() {
//     return this.formula.getParamNames();
//   }

//   getParams() {
//     return this.formula.getParams();
//   }

//   getParam(paramName) {
//     return this.formula.getParam(paramName);
//   }

//   setParam(paramName, value) {
//     this.formula.setVariable(paramName, value);
//   }

//   getData(model) {
//     let data = [];

//     for (let i = 0; i < model.matrixSize; i++) {
//       for (let j = 0; j < model.matrixSize; j++) {
//         const xr = model.start.xr + model.step * i + model.step / 2;
//         const xi = model.start.xi + model.step * j + model.step / 2;
//         let formulaIndex = 0;
//         for (let formula of this.y) {
//           formula.setVariable("x", new Complex(xr, xi));
//           const y = formula.calc();
//           console.log(i, j);
//           data.push({ i: i, j: j, xr, xi, yr: y.re, yi: y.im, formula: formulaIndex++ });
//         }
//       }
//     }

//     return data;
//   }
// }
