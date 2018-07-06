class SimpleDataVisualizer {
  constructor(data, cellSize, slider) {
    this.data = data;
    this.cell_size = cellSize;
    this.slice_index = 0;
  }

  draw(graphics) {
    graphics.background(251);

    graphics.rotateX(0.01);
    graphics.rotateY(0.01);
    //this.time += 0.001;

    this.drawAxis(graphics);

    let total_x = this.cell_size * this.data.length1;
    let total_y = this.cell_size * this.data.length2;
    let total_z = this.cell_size * this.data.length3;

    for (let i = 0; i < this.data.length1; i++) {
      for (let j = 0; j < this.data.length2; j++) {
        for (let k = 0; k < this.data.length3; k++) {
          graphics.push();
          const translate_x = -total_x / 2 + i * this.cell_size;
          const translate_y = -total_y / 2 + j * this.cell_size;
          const translate_z = -total_z / 2 + k * this.cell_size;

          graphics.translate(translate_x, translate_y, translate_z);
          //console.log(this.slider.value());
          if (this.data.get(i, j, k, this.slice_index)) {
            graphics.sphere(this.cell_size / 2);
          }
          graphics.pop();
        }
      }
    }

    return graphics;
  }

  drawAxis(graphics) {
    // Bounding box;
    graphics.translate(
      -this.cell_size / 2,
      -this.cell_size / 2,
      -this.cell_size / 2
    );
    graphics.fill(0, 0, 0, 0);
    graphics.box(this.data.length1 * this.cell_size);

    graphics.translate(
      this.cell_size / 2,
      this.cell_size / 2,
      this.cell_size / 2
    );

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
}
