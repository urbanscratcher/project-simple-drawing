function FreehandTool() {
  const self = this;

  // global properties
  this.icon = "assets/freehand.svg";
  this.name = "freehand";
  this.draw = draw;
  this.showBrush = showBrush;

  // local properties
  this.options = ["colorPalette", "thickness"];
  this.color = null;
  this.thickness = null;

  // states
  let previousMouseX = -1;
  let previousMouseY = -1;
  let drawing = false;

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
    const isStarting = mouseIsPressed && previousMouseX === -1;
    const isDrawing = mouseIsPressed && previousMouseX !== -1;
    const isEnding = !mouseIsPressed && drawing;
    const doingNothing = !mouseIsPressed && !drawing;

    if (isStarting) {
      updatePixels();
      drawing = true;
      previousMouseX = mouseX;
      previousMouseY = mouseY;
      loadPixels();
    }

    if (isDrawing) {
      stroke(self.color);
      strokeWeight(self.thickness);
      line(previousMouseX, previousMouseY, mouseX, mouseY);
      previousMouseX = mouseX;
      previousMouseY = mouseY;
    }

    if (isEnding) {
      drawing = false;
      previousMouseX = -1;
      previousMouseY = -1;
      loadPixels();
    }

    if (doingNothing) {
      updatePixels();
      showBrush();
    }
  }
}
