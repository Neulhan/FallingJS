import { SnowFlake } from "./snowFlake.js";

export default class {
  constructor(config) {
    this.config = {};
    this.set(config);
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.snowList = [];
    this.elem = document.querySelector(config.el);
    this.elem.appendChild(this.canvas);
    this.elem.style.pointerEvents = "none";

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  set(config) {
    config.frequency = config.frequency ? config.frequency : 50;
    config.radiusRange = config.radiusRange ? config.radiusRange : [0.5, 3];
    config.speedRange = config.speedRange ? config.speedRange : [0.5, 3];
    config.angleRange = config.angleRange ? config.angleRange : [-0.1, 0.1];
    config.colors = config.colors
      ? typeof config.colors === "string"
        ? JSON.parse(config.colors)
        : config.colors
      : ["#fff"];
    config.type = config.type ? config.type : "square";
    config.text = config.text ? config.text : "*";
    if (this.config.frequency !== config.frequency) {
      clearInterval(this.loop);
      this.loop = setInterval(this.addFlake.bind(this), config.frequency * 1);
    }
    this.config = config;
  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
  }
  addFlake() {
    this.snowList.push(
      new SnowFlake(this.stageWidth, this.stageHeight, this.config)
    );
  }
  resize() {
    this.stageWidth = this.elem.clientWidth;
    this.stageHeight = this.elem.clientHeight;
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }
  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.snowList.length; i++) {
      this.snowList[i].draw(this.ctx);
    }
    requestAnimationFrame(this.animate.bind(this));
  }
}
