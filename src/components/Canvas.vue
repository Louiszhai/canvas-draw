<template>
  <div id="canvasBox">
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
      const length = (this.h - this.w) / 2;
      return {
        transform: `rotate(90deg) translate(${length}px,${length}px)`,
        width: `${this.h}px`,
        height: `${this.w}px`,
        transformOrigin: 'center center',
      };
    },
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      this.draw = new Draw(canvas);
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
  padding: 20px;
  user-select: none;
}
.greet a {
  cursor: pointer;
}
canvas {
  flex: 1;
}
</style>
