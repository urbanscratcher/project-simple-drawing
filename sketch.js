let toolbox = null;

let star;
function preload() {
  star = loadImage("./assets/stamps/star.svg");
}

function setup() {
  // Create a canvas
  const containerEl = select(".canvasContainer");

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
  toolbox.addTool(new StampTool());

  // Background color setting
  background("#ffffff");
}

function draw() {
  const selectedTool = toolbox?.selectedTool;

  if (selectedTool) {
    const canDraw = selectedTool.hasOwnProperty("draw");

    if (canDraw) {
      selectedTool.draw();
    } else {
      console.log("the tool has no draw method");
    }
  }
}
