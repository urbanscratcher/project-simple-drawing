function StampTool() {
  const self = this;

  // global properties
  this.icon = "assets/stamp.svg";
  this.name = "stamp";
  this.draw = draw;
  this.setup = setup;

  // local properties
  this.options = ["thickness"];
  this.thickness = null;
  this.density = null;
  this.dispersion = null;

  // states
  let previousMouseX = -1;
  let previousMouseY = -1;
  let drawing = false;

  function setup() {
    let optionsContainer = select("#optionsContainer");

    // density txt label
    let densityTxt = createP("Density");
    densityTxt.parent(optionsContainer);
    densityTxt.class("option");

    // density slider
    let densitySlider = createSlider(1, 20, 1, 1);
    densitySlider.parent(optionsContainer);
    densitySlider.id("density");
    densitySlider.class("option");

    // density label
    let densityLabel = createP(densitySlider.value());
    densityLabel.parent(optionsContainer);
    densityLabel.class("option");
    densitySlider.mouseReleased(() => {
      densityLabel.html(densitySlider.value());
    });

    // dispersion txt label
    let dispersionTxt = createP("Dispersion");
    dispersionTxt.parent(optionsContainer);
    dispersionTxt.class("option");

    // dispersion slider
    let dispersionSlider = createSlider(10, 100, 10, 10);
    dispersionSlider.parent(optionsContainer);
    dispersionSlider.id("dispersion");
    dispersionSlider.class("option");

    // dispersion label
    let dispersionLabel = createP(dispersionSlider.value());
    dispersionLabel.parent(optionsContainer);
    dispersionLabel.class("option");
    dispersionSlider.mouseReleased(() => {
      dispersionLabel.html(dispersionSlider.value());
    });
  }

  function draw() {
    // optional setting
    self.thickness = select("#thickness")?.value() || 1;
    self.density = select("#density")?.value() || 1;
    self.dispersion = select("#dispersion")?.value() || 1;

    // conditions
    const isStarting = mouseIsPressed && previousMouseX === -1;
    const isErasing = mouseIsPressed && previousMouseY !== -1;
    const isEnding = !mouseIsPressed && drawing;
    const doingNothing = !mouseIsPressed && !drawing;

    if (isStarting) {
      updatePixels();
      drawing = true;
      for (let i = 0; i < self.density; i++) {
        let starSize = self.thickness;
        let starX = random(
          mouseX - starSize / 2 - self.dispersion,
          mouseX - starSize / 2 + self.dispersion
        );
        let starY = random(
          mouseY - starSize / 2 - self.dispersion,
          mouseY - starSize / 2 + self.dispersion
        );
        image(star, starX, starY, starSize, starSize);
      }
      loadPixels();
    }

    if (isErasing) {
      stroke("#ffffff");
      strokeWeight(self.thickness);
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

    if (doingNothing) {
      updatePixels();
      showBrush();
    }
  }

  function showBrush() {
    let starSize = self.thickness;
    let starX = mouseX - starSize / 2;
    let starY = mouseY - starSize / 2;
    image(star, starX, starY, starSize, starSize);
  }
}
