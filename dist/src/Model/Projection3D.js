class Projection3D {
  constructor(model, cellSize) {
    this.data = model.data;
    this.curves = model.curves;
    this.cell_size = cellSize;
    this.model = model;

    this.projA_data = new Set();
    this.projB_data = new Set();

    this.axies_map = {};

    this.axies_map["x"] = "xr";
    this.axies_map["z"] = "xi";
    this.axies_map["y"] = "yr";
    this.axies_map["u"] = "yi";

    this.calcData();
  }

  render(graphics) {
    // graphics.resetMatrix();
    graphics.background(251);

    let total_x = this.cell_size * this.model[this.axies_map["x"] + "_rez"];
    let total_y = this.cell_size * this.model[this.axies_map["y"] + "_rez"];
    let total_z = this.cell_size * this.model[this.axies_map["z"] + "_rez"];

    for (let data of this.projA_data) {
      const translate_x = -total_x / 2 + data.x * this.cell_size;
      const translate_y = -total_y / 2 + data.y * this.cell_size;
      const translate_z = +total_z / 2 + data.z * this.cell_size;

      graphics.translate(translate_x, translate_y, translate_z);
      graphics.fill(data.color.r, data.color.g, data.color.b);
      graphics.box(this.cell_size);
      graphics.translate(-translate_x, -translate_y, -translate_z);
    }
    this.drawAxis(graphics, total_z - this.cell_size / 2);

    for (let data of this.projB_data) {
      const translate_x = -total_x / 2 + data.x * this.cell_size;
      const translate_y = -total_y / 2 + data.y * this.cell_size;
      const translate_z = -total_z / 2 + data.z * this.cell_size;

      graphics.translate(translate_x, translate_y, translate_z);
      graphics.fill(data.color.r, data.color.g, data.color.b);
      graphics.box(this.cell_size);
      graphics.translate(-translate_x, -translate_y, -translate_z);
    }
    this.drawAxis(graphics, -total_z + this.cell_size / 2);
    return graphics;
  }

  drawAxis(graphics, pos_z) {
    const translate_x = -this.cell_size / 2;
    const translate_y = -this.cell_size / 2;
    const translate_z = pos_z;

    // Bounding box;
    graphics.stroke(1);

    graphics.translate(translate_x, translate_y, translate_z);

    graphics.fill(0, 0, 0, 0);
    graphics.box(
      this.model[this.axies_map["x"] + "_rez"] * this.cell_size,
      this.model[this.axies_map["y"] + "_rez"] * this.cell_size,
      Math.max(
        this.model[this.axies_map["z"] + "_rez"] * this.cell_size,
        this.model[this.axies_map["u"] + "_rez"] * this.cell_size
      )
    );

    graphics.translate(-translate_x, -translate_y, -translate_z);

    // Axies
    graphics.fill(255);

    graphics.stroke(255, 0, 0);
    graphics.line(0, -1000, 0, 0, 1000, 0);

    graphics.stroke(0, 255, 0);
    graphics.line(0, 0, -1000, 0, 0, 1000);

    graphics.stroke(0, 0, 255);
    graphics.line(-1000, 0, 0, 1000, 0, 0);
    graphics.stroke(0);

    // 0-coord box;
    graphics.box(5);
  }

  calcData() {
    //console.log(this.proj_data._data);

    for (let value of this.data) {
      let ccurve;
      for (let el of this.curves) {
        if (el[1] == value.curve) {
          ccurve = el[0];
        }
      }

      const colorA = ccurve.colorA;
      const colorB = ccurve.colorB;

      this.projA_data.add({
        x: value[this.axies_map["x"]],
        y: value[this.axies_map["y"]],
        z: value[this.axies_map["z"]],
        color: colorA
      });

      this.projB_data.add({
        x: value[this.axies_map["x"]],
        y: value[this.axies_map["y"]],
        z: -value[this.axies_map["u"]],
        color: colorB
      });
    }
  }
}
