class InputGroup {
  $container;
  $input;
  $label;
  $errorMessage;

  constructor(type, label, name) {
    this.$container = document.createElement("div");
    this.$container.classList.add("input-group");

    this.$input = document.createElement("input");
    this.$input.type = type;
    this.$input.name = name;

    this.$label = document.createElement("label");
    this.$label.innerHTML = label;

    this.$errorMessage = document.createElement("div");
    this.$errorMessage.classList.add("message");
  }

  getInputValue() {
    return this.$input.value;
  }

  setError(message) {
    this.$errorMessage.innerHTML = message;
    this.$input.classList.remove("success");
    this.$input.classList.add("error");
  }

  setSuccess() {
    this.$errorMessage.innerHTML = "";
    this.$input.classList.remove("error");
    this.$input.classList.add("success");
  }

  render() {
    this.$label.appendChild(this.$input);
    this.$container.appendChild(this.$label);
    this.$container.appendChild(this.$errorMessage);
    return this.$container;
  }
}

export { InputGroup };
