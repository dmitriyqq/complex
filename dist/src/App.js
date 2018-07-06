class App {
  constructor(screenBuffer) {
    console.log();
    const full_render_width = windowWidth - 300;
    const full_render_height = windowHeight;

    this.webGLBuffer = createGraphics(
      full_render_width,
      full_render_height,
      WEBGL
    );

    this._model = new Model();

    this.rebuild();

    // camera stuff
    this.cameraT = -Math.PI / 2;
    this.cameraA = 2;
    this.cameraR = 1000; // DISTANCE
    this.updateCamera();

    console.log(screenBuffer);

    // p5 canvas event handlers
    screenBuffer.mousePressed(this.mousePressed.bind(this));
    screenBuffer.mouseMoved(this.mouseDragged.bind(this));
    screenBuffer.mouseReleased(this.mouseReleased.bind(this));
    screenBuffer.mouseWheel(this.mouseWheel.bind(this));
  }

  updateCamera() {
    this.webGLBuffer.camera(
      this.cameraR * sin(this.cameraT),
      this.cameraR * cos(this.cameraA),
      this.cameraR * cos(this.cameraT),
      0,
      0,
      0,
      0,
      1,
      0
    );
  }

  cleanCurves() {
    this._model.curves.clear();
  }

  build() {
    // this._model.tryLoadLocalStorage();
    this.projection = new Projection3D(this.model, 5);
  }

  rebuild() {
    this._model.rebuild();

    // this.simple_data_visualizer = new SimpleDataVisualizer(this.model.data, 10);

    this.projection = new Projection3D(this.model, 5);

    // this.simple_grid = new DataVizGrid(this);

    //this.controls = new Controls(this);
  }

  get model() {
    return this._model;
  }

  getImage() {
    return this.projection.render(this.webGLBuffer);
  }

  update(canvasBuffer) {
    if (this.controls) this.controls.update(this);
  }

  mousePressed() {
    this.mouse_start = { x: mouseX, y: mouseY };
    this.rotating = true;
  }

  mouseDragged() {
    if (!this.mouse_start) {
      this.mouse_start = { x: mouseX, y: mouseY };
    }

    const dx = mouseX - this.mouse_start.x;
    const dy = mouseY - this.mouse_start.y;
    // console.log(dx, dy);
    if (this.rotating) {
      if (abs(dx) > abs(dy)) {
        this.cameraT -= 0.01 * dx;
      } else {
        this.cameraA += 0.01 * dy;
        if (this.cameraA > Math.PI) this.cameraA = Math.PI;
        else if (this.cameraA < -Math.PI) this.cameraA = -Math.PI;
      }
    }
    this.updateCamera();
    this.mouse_start = { x: mouseX, y: mouseY };
  }

  mouseReleased() {
    this.rotating = false;
  }

  mouseWheel(event) {
    this.cameraR += event.deltaY;
    this.updateCamera();
    return false;
  }

  /*createScatterChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    let data = [];
    let raw = this.model.getData();

    for (let i = 0; i < this.model.yr_rez; i++) {
      for (let j = 0; j < this.model.xr_rez; j++) {
        // console.log(raw.get(0, 15, j, 15));
        if (raw.get(i, 15, j, 15) != 0) {
          data.push({ x: j, y: i });
        }
      }
    }

    console.log(data);
    console.log(raw);
    let scatterChart = new Chart(ctx, {
      type: 'scatter',

      data: {
        datasets: [
          {
            label: 'Scatter Dataset',
            data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ]
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom'
            }
          ]
        }
      }
    });
  }
  */
}
