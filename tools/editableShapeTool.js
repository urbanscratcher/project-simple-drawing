function EditableShapeTool() {
  const self = this;

  // global properties
  this.icon = "assets/editableShape.svg";
  this.name = "editableShape";
  this.draw = draw;
  this.setup = setup;

  // local properties
  this.options = ["thickness"];
  this.thickness = null;

  // states
  let editing = false;
  let currentShape = [];

  function setup() {
    let optionsContainer = select("#optionsContainer");

    let editBtn = createButton("Edit Shape");
    editBtn.class("option");
    editBtn.id("editShape");
    editBtn.parent(optionsContainer);
    editBtn.mousePressed(() => {
      if (editing) {
        editing = false;
        editBtn.html("Edit Shape");
      }
      if (!editing) {
        editing = true;
        editBtn.html("Add Vertices");
      }
    });

    let finishBtn = createButton("Finish Shape");
    finishBtn.class("option");
    finishBtn.id("finishShape");
    finishBtn.parent(optionsContainer);

    // click finish btn
    finishBtn.mousePressed(() => {
      editing = false;
      editBtn.html("Edit Shape");
      draw();
      loadPixels();
      currentShape = [];
    });
  }

  function draw() {
    // optional setting
    self.thickness = select("#thickness")?.value() || 1;

    updatePixels();

    // conditions
    const isStarting = mouseIsPressed && isMousePressedOnCanvas(canvasEl);
    const isEditing = editing;
    const isEnding = !mouseIsPressed && editing;
    const doingNothing = !mouseIsPressed && !editing;

    if (isStarting) {
      if (!isEditing) {
        currentShape.push({
          x: mouseX,
          y: mouseY,
        });
      }

      if (isEditing) {
        for (let i = 0; i < currentShape.length; i++) {
          if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
            currentShape[i].x = mouseX;
            currentShape[i].y = mouseY;
          }
        }
      }
    }

    beginShape();
    for (let i = 0; i < currentShape.length; i++) {
      vertex(currentShape[i].x, currentShape[i].y);
      if (isEditing) {
        fill("red");
        ellipse(currentShape[i].x, currentShape[i].y, 10);
        noFill();
      }
    }
    endShape();
  }

  function showBrush() {
    let starSize = self.thickness;
    let starX = mouseX - starSize / 2;
    let starY = mouseY - starSize / 2;
    image(star, starX, starY, starSize, starSize);
  }
}
