import { SnowFlake } from "./snowFlake.js";

export default class {
  constructor(config) {
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
    config.angle = config.angle ? config.angle : 0;
    config.colors = config.colors ? config.colors : ["#fff"];
    config.type = config.type ? config.type : "square";
    config.text = config.text ? config.text : "*";
    this.config = config;
  }
  start() {
    requestAnimationFrame(this.animate.bind(this));
    this.loop = setInterval(this.addFlake.bind(this), this.config.frequency);
  }
  addFlake() {
    this.snowList.push(
      new SnowFlake(this.stageWidth, this.stageHeight, this.config)
    );
  }
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
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
