# FallingJS

<img width="1000" src="https://raw.githubusercontent.com/Neulhan/fallingjs/master/example/logo.svg" width="300"/>

FallingJS will help you use the beautiful snowing effect very simply!  
`example`: https://neulhan.github.io/fallingjs/

## Preview

<img src="https://raw.githubusercontent.com/Neulhan/fallingjs/master/example/preview.png" />

## Get Started

```html
<div class="snow-area"></div>

<!-- download snowy.js in github/dist -->
<script src="js/snowy.js"></script>
<script>
  const snowjs = new SnowJS({
    el: ".snow-area",
  });
  snowjs.start();
</script>
```

## Config Props

| Name          | Type     | Description                                        | Required | Default       |
| ------------- | -------- | -------------------------------------------------- | -------- | ------------- |
| `el`          | `String` | Snowy effect area by qureySelector                 | Yes      |               |
| `frequency`   | `Number` | How often snowflake elements are added to the area | No       | `20` ms       |
| `speedRange`  | `Array`  | Set speed range of snowflakes                      | No       | `[0.5, 3]`    |
| `radiusRange` | `Array`  | Set radius range of snowflakes                     | No       | `[0.5, 3]`    |
| `angleRange`  | `Array`  | Set angle range of snowflakes (-1 ~ 1 recommended) | No       | `[-0.1, 0.1]` |
| `colors`      | `Array`  | Color palette array for snowflakes                 | No       | `["#FFF"]`    |

## Future Updates

- Add config props `image` to custom snowflake image
- Add event hooks
- Angle range fix
- Refactoring frequency process to `requestAnimationFrame`
