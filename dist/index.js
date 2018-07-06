let app;

let canvas;

function setup() {
  const mount = select(".canvasPlaceholder");

  canvas = createCanvas(windowWidth, windowHeight, P2D);
  canvas.parent(mount);

  app = new App(canvas);
  window.app = app;
  window.initUI();
}

function draw() {
  const img = app.getImage();
  image(img, 0, 0);
  app.update();
}
