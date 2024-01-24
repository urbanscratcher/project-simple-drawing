function Option(optionName, initialValue) {
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
    if (
      optionName === OPTIONS.COLOR_BG ||
      optionName === OPTIONS.COLOR_OUTLINE
    ) {
      el = createDiv();

      const txtLabelEl = createP(optionName.split("_").join(" ").toUpperCase());
      txtLabelEl.class("txt label");
      const codeLabelEl = createP(initialValue.value);

      const colorEl = createColorPicker(initialValue.value);
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
    if (optionName === OPTIONS.THICKNESS) {
      el = createDiv();
      const txtLabelEl = createP(optionName.toUpperCase());
      txtLabelEl.class("txt label");
      const numLabelEl = createP(1);
      numLabelEl.class("num label");

      const sliderEl = createSlider(1, 100, initialValue.value, 1);
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

function numberOption(optionName, min, max) {}
