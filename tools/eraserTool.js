function EraserTool() {
  this.icon = "assets/eraser.svg";
  this.name = "eraser";
  this.draw = draw;
  this.options2 = [new Option(OPTION.SIZE, { value: 10 })];

  // states
  let previousMouseX = -1;
  let previousMouseY = -1;
  let drawing = false;

  function draw() {
    // optional setting
    const thickness = this.options2[0].getValue();

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

  function showBrush(thickness) {
    push();
    stroke(0);
    strokeWeight(1);
    fill("#ffffff");
    ellipse(mouseX, mouseY, thickness, thickness);
    pop();
  }
}
