function ScissorTool() {
  const self = this;

  // global properties
  this.icon = "assets/scissor.svg";
  this.name = "scissor";
  this.draw = draw;
  this.setup = setup;
  this.options = [
    new Option(OPTION.THICKNESS, { value: 1 }),
    new Option(OPTION.COLOR_OUTLINE, { value: "#000000", name: "color" }),
  ];

  // states
  let previousMouseX = -1;
  let previousMouseY = -1;
  let drawing = false;
  let selectMode = 0;
  let selectedArea = { x: -100, y: -100, w: 100, h: 100 };
  let selectedPixels = [];

  this.mousePressed = mousePressed;
  this.mouseDragged = mouseDragged;

  function setup() {
    const optionsContainer = select("#optionsContainer");

    // select btn
    const selectBtn = createButton("Select Area");
    selectBtn.class("option");
    selectBtn.id("selectArea");
    selectBtn.parent(optionsContainer);
    selectBtn.mousePressed(() => {
      switch (selectMode) {
        case 0:
          // draw -> cut
          selectMode += 1;
          selectBtn.html("Cut");
          loadPixels(); // store current frame
          break;
        case 1:
          // cut -> paste
          selectMode += 1;
          selectBtn.html("End Paste");
          updatePixels();

          selectedPixels = get(
            selectedArea.x,
            selectedArea.y,
            selectedArea.w,
            selectedArea.h
          );

          fill(255);
          noStroke();
          rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);

          break;
        case 2:
          // paste -> finish
          selectMode = 0;
          selectedArea = { x: -100, y: -100, w: 100, h: 100 };
          selectBtn.html("Select Area");
          loadPixels();
          break;
        default:
          break;
      }
    });
  }

  function mousePressed() {
    if (selectMode === 1 && isMouseOnCanvas(canvasEl)) {
      selectedArea.x = mouseX;
      selectedArea.y = mouseY;
    } else if (selectMode === 2) {
      image(selectedPixels, mouseX, mouseY);
    }
  }

  function mouseDragged() {
    if (selectMode === 1 && isMouseOnCanvas(canvasEl)) {
      let w = mouseX - selectedArea.x;
      let h = mouseY - selectedArea.y;
      selectedArea.w = w;
      selectedArea.h = h;
    }
  }

  function draw() {
    // optional setting
    const thickness = this.options[0].getValue();
    const color = this.options[1].getValue();

    // conditions
    const isStarting =
      mouseIsPressed && selectMode === 0 && previousMouseX === -1;
    const isDrawing =
      mouseIsPressed && selectMode === 0 && previousMouseX !== -1;
    const isEnding = !mouseIsPressed && selectMode === 0 && drawing;
    const isCutting =
      mouseIsPressed && selectMode === 1 && previousMouseX === -1;
    const doingNothing = !mouseIsPressed && !drawing;

    if (isStarting) {
      updatePixels();
      drawing = true;
      previousMouseX = mouseX;
      previousMouseY = mouseY;
      loadPixels();
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

    if (isCutting) {
      updatePixels();
      noStroke();
      fill(200, 200, 200, 80);
      rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
    }
  }
}
