/******/ var __webpack_modules__ = ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FallingJS)
/* harmony export */ });
/* harmony import */ var _scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene.js */ "./lib/scene.js");
/* harmony import */ var fallingrs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fallingrs */ "./node_modules/fallingrs/fallingrs.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([fallingrs__WEBPACK_IMPORTED_MODULE_1__]);
fallingrs__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



class FallingJS {
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
      ? new _scene_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
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
      : new fallingrs__WEBPACK_IMPORTED_MODULE_1__.Scene(
          new fallingrs__WEBPACK_IMPORTED_MODULE_1__.FallingConfig(
            frequency,
            minRadius,
            maxRadius,
            minSpeed,
            maxSpeed,
            minAngle,
            maxAngle,
            colors,
            fallingrs__WEBPACK_IMPORTED_MODULE_1__.FlakeType[type_],
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

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./lib/object.js":
/*!***********************!*\
  !*** ./lib/object.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FallingObject: () => (/* binding */ FallingObject)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");


class FallingObject {
  constructor(stageWidth, stageHeight, config) {
    this.x = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomFloat)(0, stageWidth);
    this.y = 0;
    this.speed = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomFloat)(config.minSpeed, config.maxSpeed);
    this.angle = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomFloat)(config.minAngle, config.maxAngle);
    this.color = config.colors[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, config.colors.length)];
    this.radius = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getRandomFloat)(config.minRadius, config.maxRadius);
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


/***/ }),

/***/ "./lib/scene.js":
/*!**********************!*\
  !*** ./lib/scene.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object.js */ "./lib/object.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
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
  addObjects(t) {
    if (this.config.frequency >= 1) {
      var i = 0;
      do {
        i++;
        this.objects.push(
          new _object_js__WEBPACK_IMPORTED_MODULE_0__.FallingObject(this.stageWidth, this.stageHeight, this.config)
        );
      } while (i <= this.config.frequency);
    } else {
      if (!this.time) this.time = t;
      let now = t - this.time;
      if (now > 1 / this.config.frequency) {
        this.time = t;
        this.objects.push(
          new _object_js__WEBPACK_IMPORTED_MODULE_0__.FallingObject(this.stageWidth, this.stageHeight, this.config)
        );
      }
    }
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
    this.addObjects(t);
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i].update() > this.stageHeight) {
        this.objects[i].deleted = true;
      }
      this.objects[i].render(this.ctx);
    }
  }
});


/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomFloat: () => (/* binding */ getRandomFloat),
/* harmony export */   getRandomInt: () => (/* binding */ getRandomInt)
/* harmony export */ });
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};


/***/ }),

/***/ "./node_modules/fallingrs/fallingrs.js":
/*!*********************************************!*\
  !*** ./node_modules/fallingrs/fallingrs.js ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FallingConfig: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.FallingConfig),
/* harmony export */   FlakeType: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.FlakeType),
/* harmony export */   Scene: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.Scene),
/* harmony export */   __wbg_appendChild_580ccb11a660db68: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_appendChild_580ccb11a660db68),
/* harmony export */   __wbg_arc_3fa57906f6d0666e: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_arc_3fa57906f6d0666e),
/* harmony export */   __wbg_beginPath_c7b9e681f2d031ca: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_beginPath_c7b9e681f2d031ca),
/* harmony export */   __wbg_buffer_12d079cc21e14bdb: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_buffer_12d079cc21e14bdb),
/* harmony export */   __wbg_call_27c0f87801dedf93: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_call_27c0f87801dedf93),
/* harmony export */   __wbg_call_b3ca7c6051f9bec1: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_call_b3ca7c6051f9bec1),
/* harmony export */   __wbg_clearRect_05de681275dda635: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_clearRect_05de681275dda635),
/* harmony export */   __wbg_clientHeight_d24efa25aa66e844: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_clientHeight_d24efa25aa66e844),
/* harmony export */   __wbg_clientWidth_7ea3915573b64350: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_clientWidth_7ea3915573b64350),
/* harmony export */   __wbg_closePath_1e01ade2e4928be9: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_closePath_1e01ade2e4928be9),
/* harmony export */   __wbg_createElement_8bae7856a4bb7411: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_createElement_8bae7856a4bb7411),
/* harmony export */   __wbg_crypto_d05b68a3572bb8ca: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_crypto_d05b68a3572bb8ca),
/* harmony export */   __wbg_document_5100775d18896c16: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_document_5100775d18896c16),
/* harmony export */   __wbg_fillRect_b5c8166281bac9df: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_fillRect_b5c8166281bac9df),
/* harmony export */   __wbg_fillText_6dfde0e3b04c85db: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_fillText_6dfde0e3b04c85db),
/* harmony export */   __wbg_fill_7f376d2e52c3054e: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_fill_7f376d2e52c3054e),
/* harmony export */   __wbg_getContext_df50fa48a8876636: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_getContext_df50fa48a8876636),
/* harmony export */   __wbg_getRandomValues_7e42b4fb8779dc6d: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_getRandomValues_7e42b4fb8779dc6d),
/* harmony export */   __wbg_globalThis_d1e6af4856ba331b: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_globalThis_d1e6af4856ba331b),
/* harmony export */   __wbg_global_207b558942527489: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_global_207b558942527489),
/* harmony export */   __wbg_instanceof_CanvasRenderingContext2d_20bf99ccc051643b: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_instanceof_CanvasRenderingContext2d_20bf99ccc051643b),
/* harmony export */   __wbg_instanceof_HtmlCanvasElement_46bdbf323b0b18d1: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_instanceof_HtmlCanvasElement_46bdbf323b0b18d1),
/* harmony export */   __wbg_instanceof_Window_f401953a2cf86220: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_instanceof_Window_f401953a2cf86220),
/* harmony export */   __wbg_log_5fd5a3ca551e717c: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_log_5fd5a3ca551e717c),
/* harmony export */   __wbg_msCrypto_10fc94afee92bd76: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_msCrypto_10fc94afee92bd76),
/* harmony export */   __wbg_new_63b92bc8671ed464: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_new_63b92bc8671ed464),
/* harmony export */   __wbg_newnoargs_e258087cd0daa0ea: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_newnoargs_e258087cd0daa0ea),
/* harmony export */   __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb),
/* harmony export */   __wbg_newwithlength_e9b4878cebadb3d3: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_newwithlength_e9b4878cebadb3d3),
/* harmony export */   __wbg_node_43b1089f407e4ec2: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_node_43b1089f407e4ec2),
/* harmony export */   __wbg_process_b02b3570280d0366: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_process_b02b3570280d0366),
/* harmony export */   __wbg_querySelector_a5f74efc5fa193dd: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_querySelector_a5f74efc5fa193dd),
/* harmony export */   __wbg_randomFillSync_b70ccbdf4926a99d: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_randomFillSync_b70ccbdf4926a99d),
/* harmony export */   __wbg_require_9a7e0f667ead4995: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_require_9a7e0f667ead4995),
/* harmony export */   __wbg_scale_9babba91f6f5b5d4: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_scale_9babba91f6f5b5d4),
/* harmony export */   __wbg_self_ce0dbfc45cf2f5be: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_self_ce0dbfc45cf2f5be),
/* harmony export */   __wbg_set_a47bac70306a19a7: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_a47bac70306a19a7),
/* harmony export */   __wbg_set_wasm: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_wasm),
/* harmony export */   __wbg_setfillStyle_4de94b275f5761f2: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_setfillStyle_4de94b275f5761f2),
/* harmony export */   __wbg_setfont_a4d031cf2c94b4db: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_setfont_a4d031cf2c94b4db),
/* harmony export */   __wbg_setheight_dc240617639f1f51: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_setheight_dc240617639f1f51),
/* harmony export */   __wbg_setwidth_080107476e633963: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_setwidth_080107476e633963),
/* harmony export */   __wbg_subarray_a1f73cd4b5b42fe1: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_subarray_a1f73cd4b5b42fe1),
/* harmony export */   __wbg_versions_c1cb42213cedf0f5: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_versions_c1cb42213cedf0f5),
/* harmony export */   __wbg_window_c6fb939a7f436783: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_window_c6fb939a7f436783),
/* harmony export */   __wbindgen_debug_string: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_debug_string),
/* harmony export */   __wbindgen_is_function: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_is_function),
/* harmony export */   __wbindgen_is_object: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_is_object),
/* harmony export */   __wbindgen_is_string: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_is_string),
/* harmony export */   __wbindgen_is_undefined: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_is_undefined),
/* harmony export */   __wbindgen_memory: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_memory),
/* harmony export */   __wbindgen_object_clone_ref: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_object_clone_ref),
/* harmony export */   __wbindgen_object_drop_ref: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_object_drop_ref),
/* harmony export */   __wbindgen_string_get: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_string_get),
/* harmony export */   __wbindgen_string_new: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_string_new),
/* harmony export */   __wbindgen_throw: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_throw),
/* harmony export */   get_random_f64: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.get_random_f64),
/* harmony export */   get_random_usize: () => (/* reexport safe */ _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.get_random_usize)
/* harmony export */ });
/* harmony import */ var _fallingrs_bg_wasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fallingrs_bg.wasm */ "./node_modules/fallingrs/fallingrs_bg.wasm");
/* harmony import */ var _fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fallingrs_bg.js */ "./node_modules/fallingrs/fallingrs_bg.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fallingrs_bg_wasm__WEBPACK_IMPORTED_MODULE_1__]);
_fallingrs_bg_wasm__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


(0,_fallingrs_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_wasm)(_fallingrs_bg_wasm__WEBPACK_IMPORTED_MODULE_1__);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./node_modules/fallingrs/fallingrs_bg.js":
/*!************************************************!*\
  !*** ./node_modules/fallingrs/fallingrs_bg.js ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FallingConfig: () => (/* binding */ FallingConfig),
/* harmony export */   FlakeType: () => (/* binding */ FlakeType),
/* harmony export */   Scene: () => (/* binding */ Scene),
/* harmony export */   __wbg_appendChild_580ccb11a660db68: () => (/* binding */ __wbg_appendChild_580ccb11a660db68),
/* harmony export */   __wbg_arc_3fa57906f6d0666e: () => (/* binding */ __wbg_arc_3fa57906f6d0666e),
/* harmony export */   __wbg_beginPath_c7b9e681f2d031ca: () => (/* binding */ __wbg_beginPath_c7b9e681f2d031ca),
/* harmony export */   __wbg_buffer_12d079cc21e14bdb: () => (/* binding */ __wbg_buffer_12d079cc21e14bdb),
/* harmony export */   __wbg_call_27c0f87801dedf93: () => (/* binding */ __wbg_call_27c0f87801dedf93),
/* harmony export */   __wbg_call_b3ca7c6051f9bec1: () => (/* binding */ __wbg_call_b3ca7c6051f9bec1),
/* harmony export */   __wbg_clearRect_05de681275dda635: () => (/* binding */ __wbg_clearRect_05de681275dda635),
/* harmony export */   __wbg_clientHeight_d24efa25aa66e844: () => (/* binding */ __wbg_clientHeight_d24efa25aa66e844),
/* harmony export */   __wbg_clientWidth_7ea3915573b64350: () => (/* binding */ __wbg_clientWidth_7ea3915573b64350),
/* harmony export */   __wbg_closePath_1e01ade2e4928be9: () => (/* binding */ __wbg_closePath_1e01ade2e4928be9),
/* harmony export */   __wbg_createElement_8bae7856a4bb7411: () => (/* binding */ __wbg_createElement_8bae7856a4bb7411),
/* harmony export */   __wbg_crypto_d05b68a3572bb8ca: () => (/* binding */ __wbg_crypto_d05b68a3572bb8ca),
/* harmony export */   __wbg_document_5100775d18896c16: () => (/* binding */ __wbg_document_5100775d18896c16),
/* harmony export */   __wbg_fillRect_b5c8166281bac9df: () => (/* binding */ __wbg_fillRect_b5c8166281bac9df),
/* harmony export */   __wbg_fillText_6dfde0e3b04c85db: () => (/* binding */ __wbg_fillText_6dfde0e3b04c85db),
/* harmony export */   __wbg_fill_7f376d2e52c3054e: () => (/* binding */ __wbg_fill_7f376d2e52c3054e),
/* harmony export */   __wbg_getContext_df50fa48a8876636: () => (/* binding */ __wbg_getContext_df50fa48a8876636),
/* harmony export */   __wbg_getRandomValues_7e42b4fb8779dc6d: () => (/* binding */ __wbg_getRandomValues_7e42b4fb8779dc6d),
/* harmony export */   __wbg_globalThis_d1e6af4856ba331b: () => (/* binding */ __wbg_globalThis_d1e6af4856ba331b),
/* harmony export */   __wbg_global_207b558942527489: () => (/* binding */ __wbg_global_207b558942527489),
/* harmony export */   __wbg_instanceof_CanvasRenderingContext2d_20bf99ccc051643b: () => (/* binding */ __wbg_instanceof_CanvasRenderingContext2d_20bf99ccc051643b),
/* harmony export */   __wbg_instanceof_HtmlCanvasElement_46bdbf323b0b18d1: () => (/* binding */ __wbg_instanceof_HtmlCanvasElement_46bdbf323b0b18d1),
/* harmony export */   __wbg_instanceof_Window_f401953a2cf86220: () => (/* binding */ __wbg_instanceof_Window_f401953a2cf86220),
/* harmony export */   __wbg_log_5fd5a3ca551e717c: () => (/* binding */ __wbg_log_5fd5a3ca551e717c),
/* harmony export */   __wbg_msCrypto_10fc94afee92bd76: () => (/* binding */ __wbg_msCrypto_10fc94afee92bd76),
/* harmony export */   __wbg_new_63b92bc8671ed464: () => (/* binding */ __wbg_new_63b92bc8671ed464),
/* harmony export */   __wbg_newnoargs_e258087cd0daa0ea: () => (/* binding */ __wbg_newnoargs_e258087cd0daa0ea),
/* harmony export */   __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb: () => (/* binding */ __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb),
/* harmony export */   __wbg_newwithlength_e9b4878cebadb3d3: () => (/* binding */ __wbg_newwithlength_e9b4878cebadb3d3),
/* harmony export */   __wbg_node_43b1089f407e4ec2: () => (/* binding */ __wbg_node_43b1089f407e4ec2),
/* harmony export */   __wbg_process_b02b3570280d0366: () => (/* binding */ __wbg_process_b02b3570280d0366),
/* harmony export */   __wbg_querySelector_a5f74efc5fa193dd: () => (/* binding */ __wbg_querySelector_a5f74efc5fa193dd),
/* harmony export */   __wbg_randomFillSync_b70ccbdf4926a99d: () => (/* binding */ __wbg_randomFillSync_b70ccbdf4926a99d),
/* harmony export */   __wbg_require_9a7e0f667ead4995: () => (/* binding */ __wbg_require_9a7e0f667ead4995),
/* harmony export */   __wbg_scale_9babba91f6f5b5d4: () => (/* binding */ __wbg_scale_9babba91f6f5b5d4),
/* harmony export */   __wbg_self_ce0dbfc45cf2f5be: () => (/* binding */ __wbg_self_ce0dbfc45cf2f5be),
/* harmony export */   __wbg_set_a47bac70306a19a7: () => (/* binding */ __wbg_set_a47bac70306a19a7),
/* harmony export */   __wbg_set_wasm: () => (/* binding */ __wbg_set_wasm),
/* harmony export */   __wbg_setfillStyle_4de94b275f5761f2: () => (/* binding */ __wbg_setfillStyle_4de94b275f5761f2),
/* harmony export */   __wbg_setfont_a4d031cf2c94b4db: () => (/* binding */ __wbg_setfont_a4d031cf2c94b4db),
/* harmony export */   __wbg_setheight_dc240617639f1f51: () => (/* binding */ __wbg_setheight_dc240617639f1f51),
/* harmony export */   __wbg_setwidth_080107476e633963: () => (/* binding */ __wbg_setwidth_080107476e633963),
/* harmony export */   __wbg_subarray_a1f73cd4b5b42fe1: () => (/* binding */ __wbg_subarray_a1f73cd4b5b42fe1),
/* harmony export */   __wbg_versions_c1cb42213cedf0f5: () => (/* binding */ __wbg_versions_c1cb42213cedf0f5),
/* harmony export */   __wbg_window_c6fb939a7f436783: () => (/* binding */ __wbg_window_c6fb939a7f436783),
/* harmony export */   __wbindgen_debug_string: () => (/* binding */ __wbindgen_debug_string),
/* harmony export */   __wbindgen_is_function: () => (/* binding */ __wbindgen_is_function),
/* harmony export */   __wbindgen_is_object: () => (/* binding */ __wbindgen_is_object),
/* harmony export */   __wbindgen_is_string: () => (/* binding */ __wbindgen_is_string),
/* harmony export */   __wbindgen_is_undefined: () => (/* binding */ __wbindgen_is_undefined),
/* harmony export */   __wbindgen_memory: () => (/* binding */ __wbindgen_memory),
/* harmony export */   __wbindgen_object_clone_ref: () => (/* binding */ __wbindgen_object_clone_ref),
/* harmony export */   __wbindgen_object_drop_ref: () => (/* binding */ __wbindgen_object_drop_ref),
/* harmony export */   __wbindgen_string_get: () => (/* binding */ __wbindgen_string_get),
/* harmony export */   __wbindgen_string_new: () => (/* binding */ __wbindgen_string_new),
/* harmony export */   __wbindgen_throw: () => (/* binding */ __wbindgen_throw),
/* harmony export */   get_random_f64: () => (/* binding */ get_random_f64),
/* harmony export */   get_random_usize: () => (/* binding */ get_random_usize)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
let wasm;
function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
* @param {number} fr
* @param {number} to
* @returns {number}
*/
function get_random_f64(fr, to) {
    const ret = wasm.get_random_f64(fr, to);
    return ret;
}

/**
* @param {number} fr
* @param {number} to
* @returns {number}
*/
function get_random_usize(fr, to) {
    const ret = wasm.get_random_usize(fr, to);
    return ret >>> 0;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
const FlakeType = Object.freeze({ Square:0,"0":"Square",Text:1,"1":"Text",Circle:2,"2":"Circle", });

const FallingConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fallingconfig_free(ptr >>> 0));
/**
*/
class FallingConfig {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FallingConfigFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fallingconfig_free(ptr);
    }
    /**
    * @param {number} frequency
    * @param {number} min_radius
    * @param {number} max_radius
    * @param {number} min_speed
    * @param {number} max_speed
    * @param {number} min_angle
    * @param {number} max_angle
    * @param {(string)[]} colors
    * @param {FlakeType} type_
    * @param {string} text
    * @param {string} el
    */
    constructor(frequency, min_radius, max_radius, min_speed, max_speed, min_angle, max_angle, colors, type_, text, el) {
        const ptr0 = passArrayJsValueToWasm0(colors, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(el, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.fallingconfig_new(frequency, min_radius, max_radius, min_speed, max_speed, min_angle, max_angle, ptr0, len0, type_, ptr1, len1, ptr2, len2);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
}

const SceneFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_scene_free(ptr >>> 0));
/**
*/
class Scene {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SceneFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_scene_free(ptr);
    }
    /**
    * @param {FallingConfig} config
    */
    constructor(config) {
        _assertClass(config, FallingConfig);
        var ptr0 = config.__destroy_into_raw();
        const ret = wasm.scene_new(ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    */
    resize() {
        wasm.scene_resize(this.__wbg_ptr);
    }
    /**
    */
    render() {
        wasm.scene_render(this.__wbg_ptr);
    }
}

function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

function __wbg_log_5fd5a3ca551e717c(arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
};

function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

function __wbg_crypto_d05b68a3572bb8ca(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

function __wbindgen_is_object(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

function __wbg_process_b02b3570280d0366(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
};

function __wbg_versions_c1cb42213cedf0f5(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

function __wbg_node_43b1089f407e4ec2(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
};

function __wbindgen_is_string(arg0) {
    const ret = typeof(getObject(arg0)) === 'string';
    return ret;
};

function __wbg_msCrypto_10fc94afee92bd76(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

function __wbg_require_9a7e0f667ead4995() { return handleError(function () {
    const ret = module.require;
    return addHeapObject(ret);
}, arguments) };

function __wbindgen_is_function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

function __wbg_randomFillSync_b70ccbdf4926a99d() { return handleError(function (arg0, arg1) {
    getObject(arg0).randomFillSync(takeObject(arg1));
}, arguments) };

function __wbg_getRandomValues_7e42b4fb8779dc6d() { return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
}, arguments) };

function __wbg_createElement_8bae7856a4bb7411() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
}, arguments) };

function __wbg_querySelector_a5f74efc5fa193dd() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).querySelector(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

function __wbg_instanceof_Window_f401953a2cf86220(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

function __wbg_document_5100775d18896c16(arg0) {
    const ret = getObject(arg0).document;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
};

function __wbg_clientWidth_7ea3915573b64350(arg0) {
    const ret = getObject(arg0).clientWidth;
    return ret;
};

function __wbg_clientHeight_d24efa25aa66e844(arg0) {
    const ret = getObject(arg0).clientHeight;
    return ret;
};

function __wbg_instanceof_HtmlCanvasElement_46bdbf323b0b18d1(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof HTMLCanvasElement;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

function __wbg_setwidth_080107476e633963(arg0, arg1) {
    getObject(arg0).width = arg1 >>> 0;
};

function __wbg_setheight_dc240617639f1f51(arg0, arg1) {
    getObject(arg0).height = arg1 >>> 0;
};

function __wbg_getContext_df50fa48a8876636() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}, arguments) };

function __wbg_appendChild_580ccb11a660db68() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).appendChild(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

function __wbg_instanceof_CanvasRenderingContext2d_20bf99ccc051643b(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof CanvasRenderingContext2D;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

function __wbg_setfillStyle_4de94b275f5761f2(arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
};

function __wbg_setfont_a4d031cf2c94b4db(arg0, arg1, arg2) {
    getObject(arg0).font = getStringFromWasm0(arg1, arg2);
};

function __wbg_beginPath_c7b9e681f2d031ca(arg0) {
    getObject(arg0).beginPath();
};

function __wbg_fill_7f376d2e52c3054e(arg0) {
    getObject(arg0).fill();
};

function __wbg_arc_3fa57906f6d0666e() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
    getObject(arg0).arc(arg1, arg2, arg3, arg4, arg5);
}, arguments) };

function __wbg_closePath_1e01ade2e4928be9(arg0) {
    getObject(arg0).closePath();
};

function __wbg_clearRect_05de681275dda635(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).clearRect(arg1, arg2, arg3, arg4);
};

function __wbg_fillRect_b5c8166281bac9df(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
};

function __wbg_fillText_6dfde0e3b04c85db() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillText(getStringFromWasm0(arg1, arg2), arg3, arg4);
}, arguments) };

function __wbg_scale_9babba91f6f5b5d4() { return handleError(function (arg0, arg1, arg2) {
    getObject(arg0).scale(arg1, arg2);
}, arguments) };

function __wbg_newnoargs_e258087cd0daa0ea(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

function __wbg_call_27c0f87801dedf93() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

function __wbindgen_string_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

function __wbg_self_ce0dbfc45cf2f5be() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

function __wbg_window_c6fb939a7f436783() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };

function __wbg_globalThis_d1e6af4856ba331b() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

function __wbg_global_207b558942527489() { return handleError(function () {
    const ret = __webpack_require__.g.global;
    return addHeapObject(ret);
}, arguments) };

function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

function __wbg_call_b3ca7c6051f9bec1() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

function __wbg_buffer_12d079cc21e14bdb(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

function __wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

function __wbg_new_63b92bc8671ed464(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

function __wbg_set_a47bac70306a19a7(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

function __wbg_newwithlength_e9b4878cebadb3d3(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

function __wbg_subarray_a1f73cd4b5b42fe1(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

function __wbindgen_memory() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};



/***/ }),

/***/ "./node_modules/fallingrs/fallingrs_bg.wasm":
/*!**************************************************!*\
  !*** ./node_modules/fallingrs/fallingrs_bg.wasm ***!
  \**************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./fallingrs_bg.js */ "./node_modules/fallingrs/fallingrs_bg.js");
module.exports = __webpack_require__.v(exports, module.id, "996fea25309be3b6224f", {
	"./fallingrs_bg.js": {
		"__wbindgen_object_drop_ref": WEBPACK_IMPORTED_MODULE_0.__wbindgen_object_drop_ref,
		"__wbg_log_5fd5a3ca551e717c": WEBPACK_IMPORTED_MODULE_0.__wbg_log_5fd5a3ca551e717c,
		"__wbindgen_string_new": WEBPACK_IMPORTED_MODULE_0.__wbindgen_string_new,
		"__wbg_crypto_d05b68a3572bb8ca": WEBPACK_IMPORTED_MODULE_0.__wbg_crypto_d05b68a3572bb8ca,
		"__wbindgen_is_object": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_object,
		"__wbg_process_b02b3570280d0366": WEBPACK_IMPORTED_MODULE_0.__wbg_process_b02b3570280d0366,
		"__wbg_versions_c1cb42213cedf0f5": WEBPACK_IMPORTED_MODULE_0.__wbg_versions_c1cb42213cedf0f5,
		"__wbg_node_43b1089f407e4ec2": WEBPACK_IMPORTED_MODULE_0.__wbg_node_43b1089f407e4ec2,
		"__wbindgen_is_string": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_string,
		"__wbg_msCrypto_10fc94afee92bd76": WEBPACK_IMPORTED_MODULE_0.__wbg_msCrypto_10fc94afee92bd76,
		"__wbg_require_9a7e0f667ead4995": WEBPACK_IMPORTED_MODULE_0.__wbg_require_9a7e0f667ead4995,
		"__wbindgen_is_function": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_function,
		"__wbg_randomFillSync_b70ccbdf4926a99d": WEBPACK_IMPORTED_MODULE_0.__wbg_randomFillSync_b70ccbdf4926a99d,
		"__wbg_getRandomValues_7e42b4fb8779dc6d": WEBPACK_IMPORTED_MODULE_0.__wbg_getRandomValues_7e42b4fb8779dc6d,
		"__wbg_createElement_8bae7856a4bb7411": WEBPACK_IMPORTED_MODULE_0.__wbg_createElement_8bae7856a4bb7411,
		"__wbg_querySelector_a5f74efc5fa193dd": WEBPACK_IMPORTED_MODULE_0.__wbg_querySelector_a5f74efc5fa193dd,
		"__wbg_instanceof_Window_f401953a2cf86220": WEBPACK_IMPORTED_MODULE_0.__wbg_instanceof_Window_f401953a2cf86220,
		"__wbg_document_5100775d18896c16": WEBPACK_IMPORTED_MODULE_0.__wbg_document_5100775d18896c16,
		"__wbg_clientWidth_7ea3915573b64350": WEBPACK_IMPORTED_MODULE_0.__wbg_clientWidth_7ea3915573b64350,
		"__wbg_clientHeight_d24efa25aa66e844": WEBPACK_IMPORTED_MODULE_0.__wbg_clientHeight_d24efa25aa66e844,
		"__wbg_instanceof_HtmlCanvasElement_46bdbf323b0b18d1": WEBPACK_IMPORTED_MODULE_0.__wbg_instanceof_HtmlCanvasElement_46bdbf323b0b18d1,
		"__wbg_setwidth_080107476e633963": WEBPACK_IMPORTED_MODULE_0.__wbg_setwidth_080107476e633963,
		"__wbg_setheight_dc240617639f1f51": WEBPACK_IMPORTED_MODULE_0.__wbg_setheight_dc240617639f1f51,
		"__wbg_getContext_df50fa48a8876636": WEBPACK_IMPORTED_MODULE_0.__wbg_getContext_df50fa48a8876636,
		"__wbg_appendChild_580ccb11a660db68": WEBPACK_IMPORTED_MODULE_0.__wbg_appendChild_580ccb11a660db68,
		"__wbg_instanceof_CanvasRenderingContext2d_20bf99ccc051643b": WEBPACK_IMPORTED_MODULE_0.__wbg_instanceof_CanvasRenderingContext2d_20bf99ccc051643b,
		"__wbg_setfillStyle_4de94b275f5761f2": WEBPACK_IMPORTED_MODULE_0.__wbg_setfillStyle_4de94b275f5761f2,
		"__wbg_setfont_a4d031cf2c94b4db": WEBPACK_IMPORTED_MODULE_0.__wbg_setfont_a4d031cf2c94b4db,
		"__wbg_beginPath_c7b9e681f2d031ca": WEBPACK_IMPORTED_MODULE_0.__wbg_beginPath_c7b9e681f2d031ca,
		"__wbg_fill_7f376d2e52c3054e": WEBPACK_IMPORTED_MODULE_0.__wbg_fill_7f376d2e52c3054e,
		"__wbg_arc_3fa57906f6d0666e": WEBPACK_IMPORTED_MODULE_0.__wbg_arc_3fa57906f6d0666e,
		"__wbg_closePath_1e01ade2e4928be9": WEBPACK_IMPORTED_MODULE_0.__wbg_closePath_1e01ade2e4928be9,
		"__wbg_clearRect_05de681275dda635": WEBPACK_IMPORTED_MODULE_0.__wbg_clearRect_05de681275dda635,
		"__wbg_fillRect_b5c8166281bac9df": WEBPACK_IMPORTED_MODULE_0.__wbg_fillRect_b5c8166281bac9df,
		"__wbg_fillText_6dfde0e3b04c85db": WEBPACK_IMPORTED_MODULE_0.__wbg_fillText_6dfde0e3b04c85db,
		"__wbg_scale_9babba91f6f5b5d4": WEBPACK_IMPORTED_MODULE_0.__wbg_scale_9babba91f6f5b5d4,
		"__wbg_newnoargs_e258087cd0daa0ea": WEBPACK_IMPORTED_MODULE_0.__wbg_newnoargs_e258087cd0daa0ea,
		"__wbg_call_27c0f87801dedf93": WEBPACK_IMPORTED_MODULE_0.__wbg_call_27c0f87801dedf93,
		"__wbindgen_string_get": WEBPACK_IMPORTED_MODULE_0.__wbindgen_string_get,
		"__wbindgen_object_clone_ref": WEBPACK_IMPORTED_MODULE_0.__wbindgen_object_clone_ref,
		"__wbg_self_ce0dbfc45cf2f5be": WEBPACK_IMPORTED_MODULE_0.__wbg_self_ce0dbfc45cf2f5be,
		"__wbg_window_c6fb939a7f436783": WEBPACK_IMPORTED_MODULE_0.__wbg_window_c6fb939a7f436783,
		"__wbg_globalThis_d1e6af4856ba331b": WEBPACK_IMPORTED_MODULE_0.__wbg_globalThis_d1e6af4856ba331b,
		"__wbg_global_207b558942527489": WEBPACK_IMPORTED_MODULE_0.__wbg_global_207b558942527489,
		"__wbindgen_is_undefined": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_undefined,
		"__wbg_call_b3ca7c6051f9bec1": WEBPACK_IMPORTED_MODULE_0.__wbg_call_b3ca7c6051f9bec1,
		"__wbg_buffer_12d079cc21e14bdb": WEBPACK_IMPORTED_MODULE_0.__wbg_buffer_12d079cc21e14bdb,
		"__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb": WEBPACK_IMPORTED_MODULE_0.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb,
		"__wbg_new_63b92bc8671ed464": WEBPACK_IMPORTED_MODULE_0.__wbg_new_63b92bc8671ed464,
		"__wbg_set_a47bac70306a19a7": WEBPACK_IMPORTED_MODULE_0.__wbg_set_a47bac70306a19a7,
		"__wbg_newwithlength_e9b4878cebadb3d3": WEBPACK_IMPORTED_MODULE_0.__wbg_newwithlength_e9b4878cebadb3d3,
		"__wbg_subarray_a1f73cd4b5b42fe1": WEBPACK_IMPORTED_MODULE_0.__wbg_subarray_a1f73cd4b5b42fe1,
		"__wbindgen_debug_string": WEBPACK_IMPORTED_MODULE_0.__wbindgen_debug_string,
		"__wbindgen_throw": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw,
		"__wbindgen_memory": WEBPACK_IMPORTED_MODULE_0.__wbindgen_memory
	}
});

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		loaded: false,
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Flag the module as loaded
/******/ 	module.loaded = true;
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 	var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 	var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 	var resolveQueue = (queue) => {
/******/ 		if(queue && queue.d < 1) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				var queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				var obj = {};
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		var ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__webpack_require__.a = (module, body, hasAwait) => {
/******/ 		var queue;
/******/ 		hasAwait && ((queue = []).d = -1);
/******/ 		var depQueues = new Set();
/******/ 		var exports = module.exports;
/******/ 		var currentDeps;
/******/ 		var outerResolve;
/******/ 		var reject;
/******/ 		var promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		body((deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			var fn;
/******/ 			var getResult = () => (currentDeps.map((d) => {
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			var promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 		queue && queue.d < 0 && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/global */
/******/ (() => {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ })();
/******/ 
/******/ /* webpack/runtime/harmony module decorator */
/******/ (() => {
/******/ 	__webpack_require__.hmd = (module) => {
/******/ 		module = Object.create(module);
/******/ 		if (!module.children) module.children = [];
/******/ 		Object.defineProperty(module, 'exports', {
/******/ 			enumerable: true,
/******/ 			set: () => {
/******/ 				throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 			}
/******/ 		});
/******/ 		return module;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/wasm loading */
/******/ (() => {
/******/ 	__webpack_require__.v = (exports, wasmModuleId, wasmModuleHash, importsObj) => {
/******/ 		var req = fetch(__webpack_require__.p + "" + wasmModuleHash + ".module.wasm");
/******/ 		var fallback = () => (req
/******/ 			.then((x) => (x.arrayBuffer()))
/******/ 			.then((bytes) => (WebAssembly.instantiate(bytes, importsObj)))
/******/ 			.then((res) => (Object.assign(exports, res.instance.exports))));
/******/ 		return req.then((res) => {
/******/ 			if (typeof WebAssembly.instantiateStreaming === "function") {
/******/ 				return WebAssembly.instantiateStreaming(res, importsObj)
/******/ 					.then(
/******/ 						(res) => (Object.assign(exports, res.instance.exports)),
/******/ 						(e) => {
/******/ 							if(res.headers.get("Content-Type") !== "application/wasm") {
/******/ 								console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
/******/ 								return fallback();
/******/ 							}
/******/ 							throw e;
/******/ 						}
/******/ 					);
/******/ 			}
/******/ 			return fallback();
/******/ 		});
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/publicPath */
/******/ (() => {
/******/ 	__webpack_require__.p = "https://cdn.jsdelivr.net/npm/fallingjs@0.0.13/dist/";
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module used 'module' so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__("./lib/index.js");
/******/ __webpack_exports__ = await __webpack_exports__;
/******/ var __webpack_exports__default = __webpack_exports__["default"];
/******/ export { __webpack_exports__default as default };
/******/ 

//# sourceMappingURL=index.js.map