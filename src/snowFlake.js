import { getRandomFloat, getRandomInt } from "./utils.js";

export class SnowFlake {
  constructor(stageWidth, stageHeight, config) {
    this.x = getRandomFloat(0, stageWidth);
    this.y = 0;
    this.speed = getRandomFloat(config.speedRange[0], config.speedRange[1]);
    this.angle = getRandomFloat(config.angleRange[0], config.angleRange[1]);
    this.color = config.colors[getRandomInt(0, config.colors.length)];
    this.radius = getRandomFloat(config.radiusRange[0], config.radiusRange[1]);
    this.type = config.type;
    this.text = config.text;
  }

  update() {
    this.x += this.angle * this.speed;
    this.y += this.speed;
  }

  draw(ctx) {
    this.update();

    ctx.beginPath();

    switch (this.type) {
      case "circle":
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        break;
      case "square":
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.radius * 2, this.radius * 2);
        break;
      case "text":
        ctx.font = `${this.radius * 5}px serif`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }

    ctx.closePath();
  }
}
