class Parabola {
  constructor(a, b, c) {
    this.a = a || new Complex();

    this.b = b || new Complex();

    this.c = c || new Complex();

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
  }

  getData(app) {
    return this.solveForValue(app, "xr", "xi", "yr", "yi")
      .concat
      // this.solveForValue(app, 'yr', 'yi', 'xr', 'xi')
      ();
  }

  solveForValue(app, lr, li, tr, ti) {
    const r_rez = app[lr + "_rez"];
    const i_rez = app[li + "_rez"];
    const r_start = app[lr + "_start"];
    const i_start = app[li + "_start"];
    const r_step = app[lr + "_step"];
    const i_step = app[li + "_step"];
    let data = [];
    for (let i = 0; i < r_rez; i++) {
      for (let j = 0; j < i_rez; j++) {
        const xr = r_start + r_step * i + r_step / 2;
        const xi = i_start + i_step * j + r_step / 2;
        let yy = this.solveForPoint(xr, xi);

        let val1 = {};
        val1[lr] = xr;
        val1[li] = xi;
        val1[tr] = yy[0].re;
        val1[ti] = yy[0].im;
        data.push(val1);
      }
    }

    return data;
  }

  solveForPoint(pr, pi) {
    let sols = [];
    let x = new Complex(pr, pi);
    let y = this.a
      .mult(x.square())
      .add(this.b.mult(x))
      .add(this.c);
    //console.log(y);
    sols.push(y);

    return sols;
  }
}
