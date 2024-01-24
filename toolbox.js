// A container object to store tools
function Toolbox() {
  this.tools = [];
  this.selectedTool = null;
  this.selectTool = selectTool;
  this.addTool = addTool;

  function selectTool(toolName) {
    const searchedTool = this.tools.filter((tool) => tool.name === toolName);

    // check if exists
    if (!searchedTool) {
      console.log(tooName + " not exists");
      return;
    } else {
      this.selectedTool = searchedTool[0];
    }

    // clear option menu ui
    let optionEls = selectAll(".option");
    if (optionEls.length > 0) {
      optionEls.forEach((el) => el.remove());
    }

    // display options
    const optionsContainerEl = select("#optionsContainer");
    const options = this.selectedTool?.options;
    if (options?.length > 0) {
      for (let i = 0; i < options.length; i++) {
        const el = options[i].createEl();
        optionsContainerEl.child(el);
      }
    }

    // setup
    if (this.selectedTool.hasOwnProperty("setup")) {
      this.selectedTool.setup();
    }
  }

  function addTool(tool) {
    // add a tool
    const hasIconAndName =
      tool.hasOwnProperty("icon") && tool.hasOwnProperty("name");
    if (!hasIconAndName) {
      console.log("Need icons and names of a tool");
      return;
    }
    this.tools.push(tool);

    // display
    const imgEl = createImg(tool.icon, tool.name);
    const liEl = createElement("li");
    liEl.class(`btn`);
    liEl.id(tool.name);
    imgEl.parent(liEl);
    liEl.mouseClicked(() => {
      this.selectTool(tool.name);
      loadPixels();
    });
    const sidebarEl = select(".sidebar");
    liEl.parent(sidebarEl);
  }
}
