# FallingJS

FallingJS will help you use the beautiful snowing effect very simply!  
`examples`: https://neulhan.github.io/FallingJS/

## Preview

<img src="https://raw.githubusercontent.com/Neulhan/fallingjs/master/examples/preview.png" />

## Get Started

```html
<script type="module">
  const fallingjs = new FallingJS();
  fallingjs.start();
</script>
```

## Config Props

| Name        | Type            | Description                                      | Required | Default    |
| ----------- | --------------- | ------------------------------------------------ | -------- | ---------- |
| `el`        | `String`        | Falling effect area by css selector              | No       | `body`     |
| `frequency` | `Number`        | Set falling object adding frequency to the area  | No       | `0.1`      |
| `minSpeed`  | `Number`        | Set min speed of snowflakes                      | No       | `0.5`      |
| `maxSpeed`  | `Number`        | Set max speed of snowflakes                      | No       | `2`        |
| `minRadius` | `Number`        | Set min radius of snowflakes                     | No       | `1`        |
| `maxRadius` | `Number`        | Set max radius of snowflakes                     | No       | `3`        |
| `minAngle`  | `Number`        | Set min angle of snowflakes (-1 ~ 1 recommended) | No       | `-0.2`     |
| `maxAngle`  | `Number`        | Set max angle of snowflakes (-1 ~ 1 recommended) | No       | `0.2`      |
| `colors`    | `Array<String>` | Color palette array for snowflakes               | No       | `["#FFF"]` |
| `wasm`      | `Boolean`       | Use rust-wasm version rendering                  | No       | `false`    |

## Future Updates

- Add config props `image` to custom snowflake image
- Add event hooks
- Angle range fix
- Slower frequency in 0 ~ 1
