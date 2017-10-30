# canvas-draw

![License MIT](https://img.shields.io/npm/l/express.svg)

[demo](http://louiszhai.github.io/res/canvasDraw/)	微信中签名并分享请戳 [sign demo](http://louiszhai.github.io/res/canvasDraw/#/sign)

> use canvas to draw

## Clone

```
git clone git@github.com:Louiszhai/canvas-draw.git
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9588
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## How to use

canvas-draw基于vue-cli搭建，支持pc和mobile端。其核心代码为[src/utils/draw.js](https://github.com/Louiszhai/canvas-draw/blob/master/src/utils/draw.js)，使用方法请参考[src/components/Canvas.vue](https://github.com/Louiszhai/canvas-draw/blob/master/src/components/Canvas.vue)。

以下是详细介绍。

支持mobile端时，由于手机尺寸限制，画布甚至包含画布的父级容器往往需要旋转至横屏展示，旋转角度通常有如下三种：

```
0°	正常
90°	顺时针旋转90°
180°	顺时针旋转180°
-90°	逆时针旋转90°
```

第一步，旋转画布或其父级容器。

```js
getStyle() {
  const d = document;
  const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
  const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
  let length = (h - w) / 2;
  let width = w;
  let height = h;

  switch (this.degree) {
    case -90:
      length = -length;
    case 90:
      width = h;
      height = w;
      break;
    default:
      length = 0;
  }
  return {
    transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`, // rotate后需要translate以适应新的宽高
    width: `${width}px`,
    height: `${height}px`,
    transformOrigin: 'center center', // 指定旋转的中心
  };
},
```

以上，获取了画布或其父级容器的样式，degree是旋转度数，默认为0。请注意，旋转只是视觉变化，此时canvas的坐标系并没有变化，依然是标准坐标系。因此需要重置画布坐标系。

第二步，初始化canvas画布，支持手写，并重置坐标系。

```js
import Draw from '../utils/draw';
initCanvas() {
  const canvas = document.querySelector('canvas');
  this.draw = new Draw(canvas, -this.degree);
},
```

接下来就可以尝试手写了，由于画布可能旋转，并且坐标系可能被重置，因此擦除画布内容参考如下。

```js
clear() {
  this.draw.clear();
},
```

绘画好的内容，需要这么下载（由于移动端webview限制，现仅支持PC端下载）。

```js
download() {
  this.draw.downloadPNGImage(this.draw.getPNGImage());
},
```

当然，你可以将内容上传至服务器，参考如下。

```js
upload() {
  const image = this.draw.getPNGImage();
  const blob = this.draw.dataURLtoBlob(image);

  const url = ''; // 此处替换为你的远程服务器上传地址
  const successCallback = (response) => {
    console.log(response);
  };
  const failureCallback = (error) => {
    console.log(error);
  };
  this.draw.upload(blob, url, successCallback, failureCallback);
},
```

除此之外，canvas-draw还内置了`scale`及`rotate`方法，你可以更灵活地调整画布大小、处理图片旋转等问题，祝使用愉快。

## More detail

最后，奉上canvas-draw的实现细节：[匠心打造canvas签名组件](http://louiszhai.github.io/2017/07/07/canvas-draw/)。

## License

Released under [MIT](http://rem.mit-license.org/)  LICENSE。