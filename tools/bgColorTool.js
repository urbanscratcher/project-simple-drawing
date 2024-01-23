function BgColorTool() {
  const self = this;

  // global properties
  this.icon = "assets/bgColor.svg";
  this.name = "bgColor";
  this.draw = draw;

  // local properties
  this.options = ["bgColorPalette"];

  function draw() {
    const bgColorPaletteEl = select("#bgColorPalette");

    if (mouseIsPressed) {
      background(bgColorPaletteEl.value());
    }
  }
}
