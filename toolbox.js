// a container object to store tools
// - add new tools
// - select a tool
function Toolbox() {
  const self = this;

  this.tools = [];
  this.selectedTool = null;
  this.addTool = addTool;
  this.selectTool = selectTool;

  function addTool(tool) {
    // Check if the tool has icon & name
    if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
      console.log("도구를 추가하기 위해서는 이름과 아이콘이 있어야 합니다");
      return;
    }

    // add tool
    this.tools.push(tool);
    addToolIcon(tool);
  }

  function selectTool(toolName) {
    const searchedTool = this.tools.filter((tool) => tool.name === toolName);

    if (this.selectedTool === searchedTool[0]) return;

    searchedTool
      ? (this.selectedTool = searchedTool[0])
      : console.log(tooName + " not exists");

    // show option menu
    if (this.selectedTool?.options?.length > 0) {
      const bgColorPaletteEl = select("#bgColorPalette");
      const colorPaletteEl = select("#colorPalette");
      const thicknessEl = select("#thickness");
      const thicknessLabelEl = select("#thicknessLabel");

      this.selectedTool.options.includes("colorPalette")
        ? colorPaletteEl.class("")
        : colorPaletteEl.class("hidden");

      this.selectedTool.options.includes("bgColorPalette")
        ? bgColorPaletteEl.class("")
        : bgColorPaletteEl.class("hidden");

      if (this.selectedTool.options.includes("thickness")) {
        thicknessEl.class("");
        thicknessLabelEl.class("");

        thicknessEl.mouseReleased(() => {
          thicknessLabelEl.html(thicknessEl.value());
        });
      } else {
        thicknessEl.class("hidden");
        thicknessLabelEl.class("hidden");
      }
    }
  }

  // add a new tool to html
  function addToolIcon(tool) {
    // make image element
    const imgEl = createImg(tool.icon, tool.name, () => {
      console.log("successfully loaded: " + tool.name);
    });

    // let image element in list
    const liEl = createElement("li");
    liEl.class(`btn`);
    liEl.id(tool.name);
    imgEl.parent(liEl);

    // add click event
    liEl.mouseClicked(toolClickHandler);

    // position: in sidebar
    const sidebarEl = select(".sidebar");
    liEl.parent(sidebarEl);
  }

  function toolClickHandler() {
    // styling on click
    const toolName = this.id();
    self.selectTool(toolName);

    // Make sure most recent changes are saved to pixel array
    loadPixels();
  }
}
