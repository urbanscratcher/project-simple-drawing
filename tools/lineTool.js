function LineTool() {
  // global properties
  this.icon = "assets/line.svg";
  this.name = "line";
  this.draw = draw;

  // local properties
  this.options = ["thickness"];
  this.options2 = [new ColorOption(OPTIONS.COLOR_OUTLINE, "#000000")];
  this.color = "#000000";
  this.thickness = 1;

  // states
  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  const adjustWidth = select(".sidebar").size().width;
  const adjustHeight = select("header").height;

  function showBrush() {
    push();
    stroke(0);
    strokeWeight(1);
    noFill();
    ellipse(mouseX, mouseY, this.thickness, this.thickness);
    pop();
  }

  function draw() {
    // optional setting
    this.color = this.options2[0].getValue();
    this.thickness = select("#thickness")?.value();

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
      stroke(this.color);
      strokeWeight(this.thickness);
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
