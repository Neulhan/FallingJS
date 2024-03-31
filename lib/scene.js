import { FallingObject } from "./object.js";

export default class {
  constructor(config) {
    this.config = config;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.objects = [];
    this.elem = document.querySelector(config.el);
    this.elem.appendChild(this.canvas);
    // this.elem.style.pointerEvents = "none";
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }
  start() {
    this.objects = [];
    requestAnimationFrame(this.animate.bind(this));
  }
  addObjects() {
    var i = 0;
    do {
      i++;
      this.objects.push(
        new FallingObject(this.stageWidth, this.stageHeight, this.config)
      );
    } while (i <= this.config.frequency);
  }
  resize() {
    this.stageWidth = this.elem.clientWidth;
    this.stageHeight = this.elem.clientHeight;
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }
  render(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.objects = this.objects.filter((obj) => obj.deleted != true);
    this.addObjects();
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].update() > this.stageHeight) {
        this.objects[i].deleted = true;
      }
      this.objects[i].render(this.ctx);
    }
  }
}
