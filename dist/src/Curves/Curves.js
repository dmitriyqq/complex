let GlobalParser = new Parser();
window.globalParser = GlobalParser;

class Curve {
  constructor(formula, params) {
    this.colorA = {
      r: Math.round(255 * Math.random()),
      g: Math.round(255 * Math.random()),
      b: Math.round(255 * Math.random())
    };

    this.colorB = {
      r: Math.round(255 * Math.random()),
      g: Math.round(255 * Math.random()),
      b: Math.round(255 * Math.random())
    };

    this.y = formula;

    const need_params = this.y[0].getParamNames();
    for (let param of need_params) {
      for (let func of this.y) {
        func.setVariable(param, new Complex(0, 0));
      }
    }

    if (params)
      for (param of params) {
        this.setParam(param.label, param.value);
      }
  }

  getParamNames() {
    return this.y[0].getParamNames();
  }

  getParams() {
    console.log(this.y[0]);
    return this.y[0].getParams();
  }

  getParam(paramName) {
    return this.y[0].getParam(paramName);
  }

  setParam(paramName, value) {
    for (let formula of this.y) {
      formula.setVariable(paramName, value);
    }
  }

  getData(app) {
    const r_rez = app.xr_rez;
    const i_rez = app.xi_rez;
    const r_start = app.xr_start;
    const i_start = app.xi_start;
    const r_step = app.xr_step;
    const i_step = app.xi_step;

    let data = [];

    for (let i = 0; i < r_rez; i++) {
      for (let j = 0; j < i_rez; j++) {
        const xr = r_start + r_step * i + r_step / 2;
        const xi = i_start + i_step * j + r_step / 2;
        // console.log(this.y);
        for (let formula of this.y) {
          formula.setVariable("x", new Complex(xr, xi));
          const y = formula.calc();
          data.push({ xr, xi, yr: y.re, yi: y.im });
        }
      }
    }

    return data;
  }
}

class Circle extends Curve {
  constructor(params) {
    const formula = [
      GlobalParser.eval("((2 * y0) + (0- 4*((x - x0)^2 - r^2))^ (1 / 2))/2"),
      GlobalParser.eval("((2 * y0) - (0- 4*((x - x0)^2 - r^2))^ (1 / 2))/2")
    ];
    super(formula, params);
  }
}

class Line extends Curve {
  constructor(params) {
    const formula = [GlobalParser.eval("A*x+B")];
    super(formula, params);
  }
}

class Parabola extends Curve {
  constructor(params) {
    const formula = [GlobalParser.eval("A*x^2")];
    super(formula, params);
  }
}

class Hyperbola extends Curve {
  constructor(params) {
    const formula = [GlobalParser.eval("A / x")];
    super(formula, params);
  }
}
