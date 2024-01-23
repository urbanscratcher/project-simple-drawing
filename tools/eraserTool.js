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

  function draw() {
    // optional setting
    self.thickness = select("#thickness")?.value() || 1;

    // conditions
    const isStarting = mouseIsPressed && previousMouseX === -1;
    const isErasing = mouseIsPressed && previousMouseY !== -1;
    const isEnding = !mouseIsPressed;

    if (isStarting) {
      previousMouseX = mouseX;
      previousMouseY = mouseY;
    }

    if (isErasing) {
      stroke("#ffffff");
      strokeWeight(self.thickness);
      line(previousMouseX, previousMouseY, mouseX, mouseY);
      previousMouseX = mouseX;
      previousMouseY = mouseY;
    }

    if (isEnding) {
      previousMouseX = -1;
      previousMouseY = -1;
    }
  }
}
