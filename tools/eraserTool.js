function EraserTool() {
  const self = this;

  // global properties
  this.icon = "assets/eraser.svg";
  this.name = "eraser";
  this.draw = draw;

  // local properties
  this.options = ["thickness"];
  this.thickness = null;

  // states
  let previousMouseX = -1;
  let previousMouseY = -1;
  let drawing = false;
  function showBrush() {
    push();
    stroke(0);
    strokeWeight(1);
    noFill();
    ellipse(mouseX, mouseY, self.thickness, self.thickness);
    pop();
  }

  function draw() {
    // optional setting
    self.thickness = select("#thickness")?.value() || 1;

    // conditions
    const isStarting = mouseIsPressed && previousMouseX === -1;
    const isErasing = mouseIsPressed && previousMouseY !== -1;
    const isEnding = !mouseIsPressed && drawing;
    const doingNothing = !mouseIsPressed && !drawing;

    if (isStarting) {
      updatePixels();
      drawing = true;
      previousMouseX = mouseX;
      previousMouseY = mouseY;
      loadPixels();
    }

    if (isErasing) {
      stroke("#ffffff");
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
