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
