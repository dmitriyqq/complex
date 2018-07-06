class Hyperbola {
  constructor(a, b) {
    this.a = a || new Complex();

    this.b = b || new Complex();

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
    return this.solveForValue(app, 'xr', 'xi', 'yr', 'yi')
      .concat
      // this.solveForValue(app, 'yr', 'yi', 'xr', 'xi')
      ();
  }

  solveForValue(app, lr, li, tr, ti) {
    const r_rez = app[lr + '_rez'];
    const i_rez = app[li + '_rez'];
    const r_start = app[lr + '_start'];
    const i_start = app[li + '_start'];
    const r_step = app[lr + '_step'];
    const i_step = app[li + '_step'];
    let data = [];
    for (let i = 0; i < r_rez; i++) {
      for (let j = 0; j < i_rez; j++) {
        const xr = r_start + r_step * i + r_step / 2;
        const xi = i_start + i_step * j + r_step / 2;
        let yy = this.solveForPoint(xr, xi);

        let val1 = {},
          val2 = {};
        val1[lr] = xr;
        val1[li] = xi;
        val1[tr] = yy[0].re;
        val1[ti] = yy[0].im;
        val2[lr] = xr;
        val2[li] = xi;
        val2[tr] = yy[1].re;
        val2[ti] = yy[1].im;
        data.push(val1);
        data.push(val2);
      }
    }

    return data;
  }

  solveForPoint(pr, pi) {
    let x = new Complex(pr, pi);
    let t = x
      .square()
      .divide(this.a.square())
      .sub(new Complex(1, 0));
    let ys = this.b.square().mult(t);
    let roots = ys.sqrt(2);

    return roots;
  }
}
