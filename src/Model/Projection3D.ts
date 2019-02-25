import { Mappings } from 'src/Lib/Mappings';
import { Model } from './Model';

export function project3d(model: Model, mappings: Mappings) {
  const {matrixSize} = model.properties;
  const totalSize = matrixSize;

  const data = model.build();
  // const curves = model.curves;

  const projData = new Set();

  let axies;
  if (mappings) {
    axies = mappings;
  } else {
    axies = {
      x: { label: "xr", inverted: false },
      y: { label: "yr", inverted: false },
      z: { label: "xi", inverted: false }
    };
  }

  for (const value of data) {
    // let color = {r: 1, g: 1, b: 1};
    // let curveIndex = 0;

    // for (const el of curves) {
    //   curveIndex++;
    //   if (el.index === value.curve) {
    //     color = el.color;
    //   }
    // }

    projData.add({
      // color,
      // curve: curveIndex,
      formula: value.formula,
      i: value.i,
      j: value.j,
      x:
        value[axies.x.label] * (axies.x.inverted ? -1 : 1) +
        (axies.x.inverted ? Math.round(totalSize - 1) : 0),
      y:
        value[axies.y.label] * (axies.y.inverted ? -1 : 1) +
        (axies.y.inverted ? Math.round(totalSize - 1) : 0),
      z:
        value[axies.z.label] * (axies.z.inverted ? -1 : 1) +
        (axies.z.inverted ? Math.round(totalSize - 1) : 0),
    });
  }

  return projData;
}

  /* Deprecated
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
*/
