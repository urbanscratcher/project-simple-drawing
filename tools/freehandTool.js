function FreehandTool() {
  // global properties
  this.icon = "assets/freehand.svg";
  this.name = "freehand";
  this.draw = draw;

  // local properties
  this.options2 = [
    new ColorOption(OPTIONS.THICKNESS),
    new ColorOption(OPTIONS.COLOR_OUTLINE, "#000000"),
  ];

  // states
  let previousMouseX = -1;
  let previousMouseY = -1;
  let drawing = false;

  function showBrush(thickness) {
    push();
    stroke(0);
    strokeWeight(1);
    noFill();
    ellipse(mouseX, mouseY, thickness, thickness);
    pop();
  }

  function draw() {
    // optional setting
    const thickness = this.options2[0].getValue();
    const color = this.options2[1].getValue();

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
    }

    if (isDrawing) {
      stroke(color);
      strokeWeight(thickness);
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
      showBrush(thickness);
    }
  }
}
