function HelperFunctions() {
  // event handler for clearing
  select(".clear").mouseClicked(() => {
    background(255);
    loadPixels();
  });

  // event handler for saving
  select(".save").mouseClicked(() => {
    saveCanvas("myCanvas", "png");
  });
}

function isMousePressedOnCanvas(canvas) {
  let result = false;

  const canvasLeft = canvas.elt.offsetLeft;
  const canvasWidth = canvas.width;
  const canvasTop = canvas.elt.offsetTop;
  const canvasHeight = canvas.height;

  if (
    mouseX > canvasLeft &&
    mouseX < canvasLeft + canvasWidth &&
    mouseY > canvasTop &&
    mouseY < canvasTop + canvasHeight
  ) {
    result = true;
  }

  return result;
}
