function EditableShapeTool() {
  const self = this;

  // global properties
  this.icon = "assets/editableShape.svg";
  this.name = "editableShape";
  this.draw = draw;
  this.setup = setup;

  // local properties
  this.options = ["colorPalette", "thickness"];
  this.thickness = null;

  // states
  let editing = false;
  let currentShape = [];

  function setup() {
    let optionsContainer = select("#optionsContainer");

    // edit btn
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

    // finish btn
    let finishBtn = createButton("Finish Shape");
    finishBtn.class("option");
    finishBtn.id("finishShape");
    finishBtn.parent(optionsContainer);
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
    self.color = select("#colorPalette")?.value() || "black";

    // conditions
    const isStarting = mouseIsPressed && isMouseOnCanvas(canvasEl);
    const isEditing = editing;
    const isEnding = !mouseIsPressed && editing;
    const doingNothing = !mouseIsPressed && !editing;

    updatePixels();
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
    strokeWeight(self.thickness);
    fill(self.color);
    for (let i = 0; i < currentShape.length; i++) {
      vertex(currentShape[i].x, currentShape[i].y);
    }
    endShape();

    // draw editable nodes
    beginShape();
    for (let i = 0; i < currentShape.length; i++) {
      if (isEditing) {
        push();
        strokeWeight(1);
        fill("white");
        rect(currentShape[i].x - 5, currentShape[i].y - 5, 10, 10);

        pop();
      }
    }
    endShape();

    if (!isEditing) {
      showBrush();
    }
  }

  function showBrush() {
    push();
    stroke(0);
    strokeWeight(1);
    noFill();
    ellipse(mouseX, mouseY, self.thickness, self.thickness);
    pop();
  }
}
