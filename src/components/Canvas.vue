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
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      this.draw = new Draw().init(canvas);
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
