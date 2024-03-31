import SceneFromJS from "./scene.js";
import * as FallingRS from "fallingrs";

export default class FallingJS {
  constructor({
    frequency = 1,
    minRadius = 1,
    maxRadius = 3,
    minSpeed = 1,
    maxSpeed = 3,
    minAngle = -0.1,
    maxAngle = 0.1,
    colors = ["#FFF"],
    type_ = "Square",
    text = "*",
    el = "body",
    wasm = false,
  } = {}) {
    if (document.querySelector(el) === null) {
      throw new Error(`No element exists for selector "${el}".`);
    }
    this.scene = !wasm
      ? new SceneFromJS({
          frequency,
          minRadius,
          maxRadius,
          minSpeed,
          maxSpeed,
          minAngle,
          maxAngle,
          colors,
          type_,
          text,
          el,
        })
      : new FallingRS.Scene(
          new FallingRS.FallingConfig(
            frequency,
            minRadius,
            maxRadius,
            minSpeed,
            maxSpeed,
            minAngle,
            maxAngle,
            colors,
            0,
            text,
            el
          )
        );
  }

  async start() {
    this.scene.resize();
    window.addEventListener("resize", () => {
      console.log(this.scene);
      console.log(this.scene.config);
      console.log(this.scene.stageWidth);
    });

    function animate() {
      this.scene.render();
      requestAnimationFrame(animate.bind(this));
    }
    requestAnimationFrame(animate.bind(this));
  }
}
