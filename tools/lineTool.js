function LineTool() {
  const self = this;

  // global properties
  this.icon = "assets/line.svg";
  this.name = "line";
  this.draw = draw;
  this.showBrush = showBrush;

  // local properties
  this.options = ["colorPalette", "thickness"];
  this.color = null;
  this.thickness = null;

  // states
  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  const adjustWidth = select(".sidebar").size().width;
  const adjustHeight = select("header").height;

  function showBrush() {
    push();
    strokeWeight(1);
    noFill();
    ellipse(mouseX, mouseY, self.thickness, self.thickness);
    pop();
  }

  function draw() {
    // optional setting
    self.color = select("#colorPalette")?.value() || "black";
    self.thickness = select("#thickness")?.value() || 1;

    // conditions
    const isStarting = mouseIsPressed && startMouseX === -1;
    const isDrawing = mouseIsPressed && startMouseX !== -1;
    const isEnding = !mouseIsPressed && drawing;
    const doingNothing = !mouseIsPressed && !drawing;

    if (isStarting) {
      updatePixels();
      startMouseX = mouseX;
      startMouseY = mouseY;
      drawing = true;

      // loads the current value of each pixel on the canvas into the 'pixels' array
      loadPixels();
    }

    if (isDrawing) {
      updatePixels();
      stroke(self.color);
      strokeWeight(self.thickness);
      line(startMouseX, startMouseY, mouseX, mouseY);
    }

    if (isEnding) {
      loadPixels();
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }

    if (doingNothing) {
      updatePixels();
      showBrush();
    }
  }
}
