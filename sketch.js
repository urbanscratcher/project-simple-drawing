let toolbox = null;

function setup() {
  // Create a canvas
  const containerEl = select(".canvasContainer");
  console.log(containerEl);

  const canvasEl = createCanvas(
    containerEl.size().width,
    containerEl.size().height
  );
  canvasEl.style("");
  canvasEl.parent(containerEl);

  // Create a toolbox
  helpers = new HelperFunctions();
  toolbox = new Toolbox();

  // Add tools
  toolbox.addTool(new FreehandTool());
  toolbox.addTool(new LineTool());
  toolbox.addTool(new SprayTool());
  toolbox.addTool(new EraserTool());

  // Background color setting
  background("#ffffff");
}

function draw() {
  // [CHECK] any selected tool exists
  if (toolbox.selectedTool) {
    // [CHECK] the tool had a draw method before execution
    toolbox.selectedTool?.hasOwnProperty("draw")
      ? toolbox.selectedTool.draw()
      : console.log("the tool has no draw method");
  }
}
