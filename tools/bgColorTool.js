function BgColorTool() {
  const self = this;

  // set an icon, a name, and a draw function
  this.icon = "assets/bgColor.svg";
  this.name = "bgColor";

  this.options = ["bgColorPalette"];

  this.draw = draw;

  function draw() {
    const bgColorPaletteEl = select("#bgColorPalette");

    if (mouseIsPressed) {
      background(bgColorPaletteEl.value());
    }
  }
}
