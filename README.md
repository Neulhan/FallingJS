# SnowyJS

<img width="1000" src="https://raw.githubusercontent.com/Neulhan/snowyjs/master/example/logo.svg" width="300"/>

SnowyJS will help you use the beautiful snowing effect very simply!  
`example`: https://neulhan.github.io/snowyjs/

## Preview

<img src="https://raw.githubusercontent.com/Neulhan/snowyjs/master/example/preview.png" />

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


## Media
[오픈소스 맨 땅에 헤딩 SnowyJS 1화 (부제: Velog 메인에 눈내리기)](https://velog.io/@neulhan/%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4-%EB%A7%A8-%EB%95%85%EC%97%90-%ED%97%A4%EB%94%A9-SnowyJS-1-N-feat-Velog-%EB%A9%94%EC%9D%B8%EC%97%90-%EB%88%88%EB%82%B4%EB%A6%AC%EA%B8%B0)
