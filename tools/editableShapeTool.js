function EditableShapeTool() {
  this.icon = "assets/editableShape.svg";
  this.name = "editableShape";
  this.draw = draw;
  this.setup = setup;
  this.options = [
    new Option(OPTION.THICKNESS, { value: 1, min: 1, max: 10 }),
    new Option(OPTION.COLOR_BG, { value: "#ffffff", name: "bg color" }),
  ];

  // states
  let editing = false;
  let currentShape = [];
  let thickness = this.options[0].value;
  let bgColor = this.options[0].value;

  function setup() {
    const optionsContainer = select("#optionsContainer");

    // edit btn
    const editBtn = createButton("Edit Shape");
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
    const finishBtn = createButton("Finish Shape");
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
    if (this.options?.length > 0) {
      thickness = this.options[0].getValue();
      bgColor = this.options[1].getValue();
    }

    updatePixels();

    // conditions
    const isStarting = mouseIsPressed && isMouseOnCanvas(canvasEl);
    const isEditing = editing;
    const doingNothing = !mouseIsPressed && !editing;

    if (isStarting && !isEditing) {
      console.log(isMouseOnCanvas(canvasEl));
      currentShape.push({
        x: mouseX,
        y: mouseY,
      });
    }

    if (isStarting && isEditing) {
      for (let i = 0; i < currentShape.length; i++) {
        if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
          currentShape[i].x = mouseX;
          currentShape[i].y = mouseY;
        }
      }
    }

    // draw a figure
    beginShape();
    strokeWeight(thickness);
    fill(bgColor);
    for (let i = 0; i < currentShape.length; i++) {
      vertex(currentShape[i].x, currentShape[i].y);
    }
    endShape();

    // draw editable nodes
    if (isEditing) {
      beginShape();
      for (let i = 0; i < currentShape.length; i++) {
        push();
        strokeWeight(1);
        fill("white");
        rect(currentShape[i].x - 5, currentShape[i].y - 5, 10, 10);

        pop();
      }
      endShape();
    }

    if (doingNothing) {
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
