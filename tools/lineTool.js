function LineTool() {
  const self = this;

  // set an icon, a name, and a draw function
  this.icon = "assets/line.svg";
  this.name = "line";

  this.options = ["colorPalette", "thickness"];
  this.color = null;
  this.thickness = null;

  this.draw = draw;
  this.drawnLines = [];

  var startMouseX = -1;
  var startMouseY = -1;
  var drawing = false;

  const adjustWidth = select(".sidebar").size().width;
  const adjustHeight = select("header").height;

  function draw() {
    // optional setting
    self.color = select("#colorPalette")?.value() || "black";
    self.thickness = select("#thickness")?.value() || 1;

    if (mouseIsPressed) {
      if (startMouseX === -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        loadPixels();
      } else {
        updatePixels();

        stroke(self.color);
        strokeWeight(self.thickness);
        line(startMouseX, startMouseY, mouseX, mouseY);
      }
    } else if (drawing) {
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  }
}
