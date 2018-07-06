class Model {
  constructor(params = {}) {
    this.initBox(params);
    this._curves = new Map();
    this.rebuild();

    this.data = new Set();
  }

  initBox(params) {
    this.matrixSize = params.matrixSize || 50;

    this.xr_center = params.xr_center || this.xr_center || 0;
    this.xi_center = params.xi_center || this.xi_center || 0;
    this.yr_center = params.yr_center || this.yr_center || 0;
    this.yi_center = params.yi_center || this.yi_center || 0;

    this.xr_size = params.xr_size || this.xr_size || 4;
    this.xi_size = params.xi_size || this.xi_size || 4;
    this.yr_size = params.yr_size || this.yr_size || 4;
    this.yi_size = params.yi_size || this.yi_size || 4;

    this.xr_rez = this.matrixSize;
    this.xi_rez = this.matrixSize;
    this.yr_rez = this.matrixSize;
    this.yi_rez = this.matrixSize;

    this.xi_start = this.xi_center - this.xi_size / 2;
    this.xr_start = this.xr_center - this.xr_size / 2;
    this.yi_start = this.yi_center - this.yi_size / 2;
    this.yr_start = this.yr_center - this.yr_size / 2;

    this.xi_end = this.xi_center + this.xi_size / 2;
    this.xr_end = this.xr_center + this.xr_size / 2;
    this.yi_end = this.xr_center + this.xr_size / 2;
    this.yr_end = this.yr_center + this.yr_size / 2;
  }

  rebuild() {
    this.xr_step = (this.xr_end - this.xr_start) / this.xr_rez;
    this.xi_step = (this.xi_end - this.xi_start) / this.xi_rez;
    this.yr_step = (this.yr_end - this.yr_start) / this.yr_rez;
    this.yi_step = (this.yi_end - this.yi_start) / this.yi_rez;

    this.data = new Set();
    for (let curve of this._curves) {
      if (!curve.disabled) this.renderCurve(curve[0]);
    }
  }

  tryLoadLocalStorage() {
    let curves = window.localStorage.getItem("curves");
    if (JSON.parse(curves).entries) {
      console.log(curves);
      this.curves = new Map(JSON.parse(curves));
    }
  }

  get curves() {
    return this._curves;
  }

  set curves(curves) {
    this._curves = curves;
  }

  removeCurve(curve) {
    this.curves.delete(curve);
  }

  addCurve(curve) {
    this.curves.set(curve, this.curves.size);
    this.renderCurve(curve);
    this.backupCurves();
  }

  backupCurves() {
    console.log();
    window.localStorage.setItem("curves", JSON.stringify([...this.curves]));
    let curves = window.localStorage.getItem("curves");
    console.log("backuping curves");
    console.log(curves);
  }

  disableCurve(curve) {
    curve = this.curves.get(curve);
    if (curve) {
      curve.disabled = true;
      this.rebuild();
    }
  }

  renderCurve(curve) {
    const data = curve.getData(this);
    this.addData(data, this.curves.get(curve));
  }

  addData(data, curve_index) {
    if (!(data instanceof Array)) {
      if (
        data.xr >= this.xr_start &&
        data.xr <= this.xr_end &&
        data.xi >= this.xi_start &&
        data.xi <= this.xi_end &&
        data.yr >= this.yr_start &&
        data.yr <= this.yr_end &&
        data.yi >= this.yi_start &&
        data.yi <= this.yi_end
      ) {
        this.data.add({
          xr: Math.floor((data.xr - this.xr_start) / this.xr_step),
          xi: Math.floor((data.xi - this.xi_start) / this.xi_step),
          yr: Math.floor((data.yr - this.yr_start) / this.yr_step),
          yi: Math.floor((data.yi - this.yi_start) / this.yi_step),
          curve: curve_index
        });
      } else {
        //console.log('not in bounds');
      }
    } else {
      // console.log("data is not a single point");
      //console.table(data);
      for (let k of data) {
        this.addData(k, curve_index);
      }
    }
  }

  getData() {
    return this.data;
  }

  //queryData({ xr, xi, yr, yi }) {
  //  return this.data.get(xr, xi, yr, yi);
  //}

  getSizes() {
    return {
      xr: this.xr_rez,
      xi: this.xi_rez,
      yi: this.yi_rez,
      yr: this.yr_rez
    };
  }

  __debugData() {
    this.data.sort((a, b) => {
      return a.xr - b.xr != 0
        ? a.xr - b.xr
        : a.xi - b.xi != 0
          ? a.xi - b.xi
          : a.yr - b.yr != 0
            ? a.yr - b.yr
            : a.yi - b.yi;
    });
    console.table(this.data);
  }
}
