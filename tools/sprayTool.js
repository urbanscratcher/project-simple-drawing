function SprayTool() {
  // global properties
  this.icon = "assets/spray.svg";
  this.name = "spray";
  this.draw = draw;

  // local properties
  this.options = [];
  this.options2 = [
    new Option(OPTION.COLOR_OUTLINE, { value: "#000000", name: "color" }),
    new Option(OPTION.SIZE, { value: 10, min: 10, max: 100 }),
    new Option(OPTION.DENSITY, { value: 35, min: 35, max: 100 }),
  ];

  function draw() {
    // optional setting
    const color = this.options2[0].getValue();
    const spread = this.options2[1].getValue();
    const density = this.options2[2].getValue();

    if (mouseIsPressed) {
      strokeWeight(1);
      stroke(color);
      for (var i = 0; i < density; i++) {
        point(
          random(mouseX - spread, mouseX + spread),
          random(mouseY - spread, mouseY + spread)
        );
      }
    }
  }
}
