class DataViz2D {
  constructor(
    model,
    free1,
    free2,
    fixed1,
    fixed2,
    val1,
    val2,
    cellSize,
    padding
  ) {
    this.data = [];
    this.cell_size = cellSize || 10;
    let sizes = model.getSizes();

    this.free1 = free1;
    this.free2 = free2;
    this.fixed1 = fixed1;
    this.fixed2 = fixed2;
    this.val1 = val1;
    this.val2 = val2;
    this.padding = padding;
    this.width = sizes[free2] * this.cell_size;
    this.height = sizes[free1] * this.cell_size;

    for (let i = 0; i < sizes[free2]; i++) {
      this.data.push([]);
      for (let j = 0; j < sizes[free1]; j++) this.data[i][j] = [];
    }

    for (let i = 0; i < sizes[free2]; i++) {
      for (let j = 0; j < sizes[free1]; j++) {
        this.data[i][j] = model.queryData({
          [free1]: i,
          [free2]: j,
          [fixed1]: val1,
          [fixed2]: val2
        });
      }
    }

    // console.log(this.data);
  }

  draw(graphics) {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        if (this.data[i][j] != 0) {
          graphics.stroke(0);
          graphics.fill(0, 255, 0);
        } else {
          graphics.noStroke();
          graphics.fill(255);
        }
        graphics.rect(
          j * this.cell_size,
          i * this.cell_size,
          this.cell_size,
          this.cell_size
        );
      }
    }
    //this.drawLegend(graphics);
    return graphics;
  }

  drawLegend(graphics) {
    graphics.stroke(0);
    graphics.noFill();

    const top_x = -this.padding / 2;
    const top_y = -this.padding / 2;

    graphics.rect(
      -this.padding / 2,
      -this.padding / 2,
      this.width + this.padding,
      this.height + this.padding
    );

    graphics.textAlign(CENTER, CENTER);
    graphics.textSize(10);
    const LINE_EXTRA = 10;

    graphics.stroke(0, 255, 0);
    graphics.fill(0, 255, 0);
    graphics.line(this.width / 2, 0, this.width / 2, this.height);

    graphics.noStroke();

    textAlign(CENTER, TOP);
    graphics.text(0, this.width / 2, this.height, this.width, 20);
    textAlign(CENTER, BOTTOM);
    graphics.text(1, 0, -13, this.width, 20);

    graphics.stroke(0, 0, 255);
    graphics.fill(0, 0, 255);
    graphics.line(0, this.height / 2, this.width, this.height / 2);

    graphics.noStroke();
    graphics.text(0, -LINE_EXTRA, this.height / 2, 0, this.height / 2);
    graphics.text(
      1,
      this.width + LINE_EXTRA,
      this.height / 2,
      0,
      this.height / 2
    );

    graphics.fill(0);
    const text =
      this.fixed1 + ':' + this.val1 + ', ' + this.fixed2 + ':' + this.val2;

    graphics.text(text, 0, -55, this.width, 20);
  }
}
