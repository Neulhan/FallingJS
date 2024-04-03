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

| Name        | Type       | Description                                           | Required | Default    |
| ----------- | ---------- | ----------------------------------------------------- | -------- | ---------- |
| `el`        | `string`   | Falling effect area by css selector                   | No       | `body`     |
| `frequency` | `number`   | Set falling object adding frequency to the area       | No       | `0.1`      |
| `minSpeed`  | `number`   | Set min speed of falling objects                      | No       | `0.5`      |
| `maxSpeed`  | `number`   | Set max speed of falling objects                      | No       | `2`        |
| `minRadius` | `number`   | Set min radius of falling objects                     | No       | `1`        |
| `maxRadius` | `number`   | Set max radius of falling objects                     | No       | `3`        |
| `minAngle`  | `number`   | Set min angle of falling objects (-1 ~ 1 recommended) | No       | `-0.2`     |
| `maxAngle`  | `number`   | Set max angle of falling objects (-1 ~ 1 recommended) | No       | `0.2`      |
| `type`      | `string`   | Type of falling objects                               | No       | `"Circle"` |
| `colors`    | `string[]` | Color palette array for falling objects               | No       | `["#FFF"]` |
| `wasm`      | `boolean`  | Use rust-wasm version rendering                       | No       | `false`    |

## Future Updates

- Add config props `image` to custom snowflake image
- Add event hooks
