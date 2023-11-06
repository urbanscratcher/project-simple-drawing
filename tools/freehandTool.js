function FreehandTool() {
  const self = this;

  // set an icon, a name, and a draw function
  this.icon = "assets/freehand.svg";
  this.name = "freehand";

  this.options = ["colorPalette", "thickness"];
  this.color = null;
  this.thickness = null;

  this.draw = draw;

  let previousMouseX = -1;
  let previousMouseY = -1;

  function draw() {
    // optional setting
    self.color = select("#colorPalette")?.value() || "black";
    self.thickness = select("#thickness")?.value() || 1;

    if (mouseIsPressed) {
      // check if they previous X and Y are -1. set them to the current mouse X and Y if they are.
      if (previousMouseX == -1) {
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
      // if we already have values for previous X and Y we can draw a line from there to the current location
      else {
        stroke(self.color);
        strokeWeight(self.thickness);
        line(previousMouseX, previousMouseY, mouseX, mouseY);
        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
    }
    // if the mouse is released, set the previousMouse values back to -1
    else {
      previousMouseX = -1;
      previousMouseY = -1;
    }
  }
}
