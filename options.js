const OPTION = {
  COLOR_BG: "background_color",
  COLOR_OUTLINE: "outline_color",
  THICKNESS: "thickness",
  SIZE: "size",
  DENSITY: "density",
};

function Option(optionName, initialProps) {
  this.name = optionName;
  this.createEl = createEl;

  this.valueEl = null;
  this.getValue = getValue;

  function getValue() {
    return this.valueEl.value();
  }

  function createEl() {
    let el;

    // option type별 분기
    // case: color
    if (optionName === OPTION.COLOR_BG || optionName === OPTION.COLOR_OUTLINE) {
      el = createDiv();

      const txtLabelEl = createP(
        (initialProps?.name || optionName.split("_").join(" ")).toUpperCase()
      );
      txtLabelEl.class("txt label");
      const codeLabelEl = createP(initialProps.value);

      const colorEl = createColorPicker(initialProps.value);
      colorEl.changed(() => {
        codeLabelEl.html(colorEl.value());
      });
      colorEl.class("color");

      el.child(txtLabelEl);
      el.child(codeLabelEl);
      el.child(colorEl);
      this.valueEl = colorEl;
    }

    // case: range
    if (
      optionName === OPTION.THICKNESS ||
      optionName === OPTION.SIZE ||
      optionName === OPTION.DENSITY
    ) {
      el = createDiv();
      const txtLabelEl = createP(
        (initialProps?.name || optionName).toUpperCase()
      );
      txtLabelEl.class("txt label");
      const numLabelEl = createP(initialProps.value);
      numLabelEl.class("num label");

      const sliderEl = createSlider(
        initialProps?.min || 1,
        initialProps?.max || 100,
        initialProps.value,
        initialProps?.step || 1
      );
      sliderEl.class("slider option");
      sliderEl.mouseClicked(() => {
        numLabelEl.html(sliderEl.value());
      });

      el.child(txtLabelEl);
      el.child(numLabelEl);
      el.child(sliderEl);
      el.class("range");

      this.valueEl = sliderEl;
    }

    // common
    el.class("option");
    el.id(this.name);

    return el;
  }
}
