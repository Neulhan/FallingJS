import { getRandomFloat, getRandomInt } from "./utils.js";

export class FallingObject {
  constructor(stageWidth, stageHeight, config) {
    this.x = getRandomFloat(0, stageWidth);
    this.y = 0;
    this.speed = getRandomFloat(config.minSpeed, config.maxSpeed);
    this.angle = getRandomFloat(config.minAngle, config.maxAngle);
    this.color = config.colors[getRandomInt(0, config.colors.length)];
    this.radius = getRandomFloat(config.minRadius, config.maxRadius);
    this.type = config.type_;
    this.text = config.text;
  }

  update() {
    this.x += this.angle * this.speed;
    this.y += this.speed;
    return this.y;
  }

  render(ctx) {
    ctx.beginPath();

    switch (this.type) {
      case "Circle":
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        break;
      case "Square":
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.radius * 2, this.radius * 2);
        break;
      case "Text":
        ctx.font = `${this.radius * 5}px serif`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }

    ctx.closePath();
  }
}
