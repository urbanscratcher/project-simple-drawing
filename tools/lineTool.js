function LineTool() {
  // global properties
  this.icon = "assets/line.svg";
  this.name = "line";
  this.draw = draw;
  this.options2 = [
    new Option(OPTION.THICKNESS, { value: 1 }),
    new Option(OPTION.COLOR_OUTLINE, { value: "#000000", name: "color" }),
  ];

  // states
  let startMouseX = -1;
  let startMouseY = -1;
  let drawing = false;

  const adjustWidth = select(".sidebar").size().width;
  const adjustHeight = select("header").height;

  function draw() {
    // options
    const thickness = this.options2[0].getValue();
    const color = this.options2[1].getValue();

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
      loadPixels();
    }

    if (isDrawing) {
      updatePixels();
      stroke(color);
      strokeWeight(thickness);
      line(startMouseX, startMouseY, mouseX, mouseY);
    }

    if (isEnding) {
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
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
    noFill();
    ellipse(mouseX, mouseY, thickness, thickness);
    pop();
  }
}
