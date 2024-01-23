function SprayTool() {
  const self = this;

  // global properties
  this.icon = "assets/spray.svg";
  this.name = "spray";
  this.draw = draw;

  // local properties
  this.options = ["colorPalette"];
  this.points = 35;
  this.spread = 10;
  this.color = null;

  function draw() {
    // optional setting
    self.color = select("#colorPalette")?.value() || "black";

    strokeWeight(1);
    if (mouseIsPressed) {
      stroke(self.color);
      for (var i = 0; i < this.points; i++) {
        point(
          random(mouseX - this.spread, mouseX + this.spread),
          random(mouseY - this.spread, mouseY + this.spread)
        );
      }
    }
  }
}
