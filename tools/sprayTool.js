function SprayTool() {
  // global properties
  this.icon = "assets/spray.svg";
  this.name = "spray";
  this.draw = draw;
  this.options = [
    new Option(OPTION.COLOR_OUTLINE, { value: "#000000", name: "color" }),
    new Option(OPTION.SIZE, { value: 10, min: 10, max: 100 }),
    new Option(OPTION.DENSITY, { value: 30, min: 30, max: 200, step: 2 }),
  ];

  function draw() {
    // optional setting
    const color = this.options[0].getValue();
    const size = this.options[1].getValue();
    const density = this.options[2].getValue();

    if (mouseIsPressed) {
      updatePixels();
      strokeWeight(1);
      stroke(color);
      for (var i = 0; i < density; i++) {
        point(
          random(mouseX - size, mouseX + size),
          random(mouseY - size, mouseY + size)
        );
      }
      loadPixels();
    } else {
      updatePixels();
      showBrush(size, color);
    }
  }

  function showBrush(size, color) {
    push();
    stroke(color);
    strokeWeight(1);
    noFill();
    rect(mouseX - size, mouseY - size, size * 2, size * 2);
    pop();
  }
}
