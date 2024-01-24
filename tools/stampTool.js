function StampTool() {
  // global properties
  this.icon = "assets/stamp.svg";
  this.name = "stamp";
  this.draw = draw;
  this.options = [
    new Option(OPTION.SIZE, { value: 15, min: 1, max: 50 }),
    new Option(OPTION.DENSITY, { value: 3, min: 1, max: 20 }),
    new Option(OPTION.DISPERSION, { value: 40, min: 10, max: 200, step: 10 }),
  ];

  // states
  let previousMouseX = -1;
  let previousMouseY = -1;
  let drawing = false;

  function draw() {
    // optional setting
    const size = this.options[0].getValue();
    const density = this.options[1].getValue();
    const dispersion = this.options[2].getValue();

    // conditions
    const isStarting = mouseIsPressed && previousMouseX === -1;
    const isErasing = mouseIsPressed && previousMouseY !== -1;
    const isEnding = !mouseIsPressed && drawing;
    const doingNothing = !mouseIsPressed && !drawing;

    if (isStarting) {
      updatePixels();
      drawing = true;

      for (let i = 0; i < density; i++) {
        let starX = random(
          mouseX - size / 2 - dispersion,
          mouseX - size / 2 + dispersion
        );
        let starY = random(
          mouseY - size / 2 - dispersion,
          mouseY - size / 2 + dispersion
        );

        push();
        image(star, starX, starY, size, size);
        pop();
      }
      loadPixels();
    }

    if (isErasing) {
      stroke("#ffffff");
      strokeWeight(size);
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
      showBrush(size);
    }
  }

  function showBrush(size) {
    let starX = mouseX - size / 2;
    let starY = mouseY - size / 2;
    image(star, starX, starY, size, size);
  }
}
