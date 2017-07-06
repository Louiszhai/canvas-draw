<template>
  <div id="canvasBox" :style="getHorizontalStyle">
    <div class="greet">
      <span>{{msg}}</span>
      <a @touchstart="clear" @mousedown="clear">清屏</a>
      <a @touchstart="download" @mousedown="download">下载</a>
    </div>
    <canvas></canvas>
  </div>
</template>

<script>
import Draw from '../utils/draw';

export default {
  name: 'canvas',
  data() {
    return {
      msg: 'Just use canvas to draw',
      degree: 180, // 屏幕整体旋转的角度, 可取 -90,90,180等值
    };
  },
  components: {
    Draw,
  },
  mounted() {
    setTimeout(() => {
      this.initCanvas();
    });
  },
  computed: {
    getHorizontalStyle() {
      const d = document;
      this.w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
      this.h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
      let length = (this.h - this.w) / 2;
      let width = this.w;
      let height = this.h;

      switch (this.degree) {
        case -90:
          length = -length;
        case 90:
          width = this.h;
          height = this.w;
          break;
        default:
          length = 0;
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center',
      };
    },
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      this.draw = new Draw(canvas, -this.degree);
    },
    clear() {
      this.draw.clear();
    },
    download() {
      this.draw.downloadPNGImage(this.draw.getPNGImage());
    },
  },
};


</script>

<style scoped>
#canvasBox {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.greet {
  padding: 1rem;
  font-size: 1.5rem;
  user-select: none;
}
.greet a {
  cursor: pointer;
}
canvas {
  flex: 1;
  cursor: cross;
}
</style>
