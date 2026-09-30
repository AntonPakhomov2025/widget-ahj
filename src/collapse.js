import "./collapse.css";

export default class Collapse {
  constructor(container, options = {}) {
    this.container = container;
    this.title = options.title || "Collapse";
    this.content = options.content || "";
    this.isOpen = options.isOpen || false;

    this.element = null;
    this.headerEl = null;
    this.bodyEl = null;

    this.init();
  }

  init() {
    this.element = document.createElement("div");
    this.element.className = "collapse-widget";

    this.headerEl = document.createElement("div");
    this.headerEl.className = "collapse-header";
    this.headerEl.textContent = this.title;

    const arrow = document.createElement("span");
    arrow.className = "collapse-arrow";
    arrow.textContent = "▸";
    this.headerEl.appendChild(arrow);

    this.bodyEl = document.createElement("div");
    this.bodyEl.className = "collapse-body";

    const inner = document.createElement("div");
    inner.className = "collapse-content";
    if (typeof this.content === "string") {
      inner.innerHTML = this.content;
    } else {
      inner.appendChild(this.content);
    }
    this.bodyEl.appendChild(inner);

    this.element.appendChild(this.headerEl);
    this.element.appendChild(this.bodyEl);

    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }

    this.headerEl.addEventListener("click", () => this.toggle());
    this.container.appendChild(this.element);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.element.classList.add("open");
    this.headerEl.querySelector(".collapse-arrow").textContent = "▾";
    this.bodyEl.style.height = "auto";
    const height = this.bodyEl.offsetHeight;
    this.bodyEl.style.height = "0px";

    this.bodyEl.offsetHeight;
    this.bodyEl.style.height = `${height}px`;
    this.bodyEl.addEventListener(
      "transitionend",
      () => {
        if (this.isOpen) {
          this.bodyEl.style.height = "auto";
        }
      },
      { once: true },
    );
  }

  close() {
    this.isOpen = false;
    this.element.classList.remove("open");
    this.headerEl.querySelector(".collapse-arrow").textContent = "▸";
    this.bodyEl.style.height = `${this.bodyEl.offsetHeight}px`;
    this.bodyEl.offsetHeight; // eslint-disable-line no-unused-expressions
    this.bodyEl.style.height = "0px";
  }

  destroy() {
    this.headerEl.removeEventListener("click", () => this.toggle());
    this.element.remove();
  }
}
