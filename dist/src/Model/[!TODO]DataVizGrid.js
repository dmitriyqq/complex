class DataVizGrid {
  constructor(app) {
    this.slices = new Array(app.model.xi_rez);
    this.cell_size = 3;
    for (let i = 0; i < this.slices.length; i++) {
      this.slices[i] = new Array(app.model.yi_rez);
    }

    this.rebuild(app);
  }

  rebuild(app) {
    this.padding_offset_x = 2;
    this.padding_offset_y = 5;
    this.padding = 10;

    for (let i = 0; i < this.slices.length; i++) {
      for (let j = 0; j < this.slices.length; j++) {
        this.slices[i][j] = new DataViz2D(
          app.model,
          'xr',
          'yr',
          'xi',
          'yi',
          i,
          j,
          this.cell_size,
          this.padding
        );
      }
    }

    this.slice_width = this.slices[0][0].width;
    this.slice_height = this.slices[0][0].height;

    this.graphics = createGraphics(
      (this.slices[0].length + 1) * this.slice_width +
        this.padding * this.slice_width * 4,
      (this.slices.length + 1) * this.slice_height +
        this.padding * this.slice_height * 4
    );

    this.render();
  }

  draw() {
    return this.graphics;
  }

  render() {
    this.graphics.background(241);

    let padding_offset_x = this.padding_offset_x;
    let padding_offset_y = this.padding_offset_y;

    for (let i = 0; i < this.slices.length; i++) {
      for (let j = 0; j < this.slices[0].length; j++) {
        this.graphics.push();
        this.graphics.translate(
          j * this.slice_width + padding_offset_x * this.padding,
          i * this.slice_height + padding_offset_y * this.padding
        );
        padding_offset_x++;
        this.slices[i][j].draw(this.graphics);
        this.graphics.pop();
      }
      padding_offset_x = this.padding_offset_x;
      padding_offset_y++;
    }

    //this.graphics.stroke(0);
    //this.graphics.strokeWeight(2);
    //this.graphics.fill(0);
    //this.graphics.rect(0, 0, 100, 100);

    return this.graphics;
  }
}
