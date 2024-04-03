import SceneFromJS from "./scene.js";
import * as FallingRS from "fallingrs";

export default class FallingJS {
  constructor({
    frequency = 0.1,
    minRadius = 1,
    maxRadius = 3,
    minSpeed = 0.5,
    maxSpeed = 2,
    minAngle = -0.2,
    maxAngle = 0.2,
    colors = ["#FFF"],
    type_ = "Circle",
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
            FallingRS.FlakeType[type_],
            text,
            el
          )
        );
  }

  async start() {
    this.scene.resize();
    window.addEventListener("resize", () => {
      this.scene.resize();
    });

    function animate(t) {
      this.scene.render(t);
      requestAnimationFrame(animate.bind(this));
    }
    requestAnimationFrame(animate.bind(this));
  }
}
