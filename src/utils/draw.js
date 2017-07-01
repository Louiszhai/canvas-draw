/**
 * Created by louizhai on 17/6/30.
 * description: use canvas to draw.
 */
function Draw() {}
Draw.prototype = {
  init(canvas, config = {}) {
    let { width, height } = window.getComputedStyle(canvas, null);
    width = width.replace('px', '');
    height = height.replace('px', '');

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.width = width;
    this.height = height;
    const context = this.context;

    // 根据设备像素比优化canvas绘图
    const devicePixelRatio = window.devicePixelRatio;
    if (devicePixelRatio) {
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.height = height * devicePixelRatio;
      canvas.width = width * devicePixelRatio;
      context.scale(devicePixelRatio, devicePixelRatio);
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    context.imageSmoothingEnabled = true;
    context.strokeStyle = 'black';
    context.lineWidth = 10;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    Object.assign(context, config);

    const { left, top } = canvas.getBoundingClientRect();

    let paints = [];
    let pressed = false;

    const paint = () => {
      context.beginPath();
      context.moveTo(paints[0][0], paints[0][1]);
      if (paints.length !== 1) {
        paints.forEach((item) => {
          const x = item[0];
          const y = item[1];
          context.lineTo(x, y);
          context.moveTo(x, y);
        });
        paints = [paints.pop()];
      }
      context.closePath();
      context.stroke();
    };
    const fn = (type, status = 0) => (e) => {
      if (!status) {
        paints = [];
        pressed = true;
      }
      if (pressed) {
        e = e.type === type ? e : e.touches[0];
        const x = e.clientX - left;
        const y = e.clientY - top;
        paints.push([x, y]);
        paint();
      }
    };
    const start = fn('mousedown', 0);
    const move = fn('mousemove', 1);
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('touchstart', start);

    const requestAnimationFrame = window.requestAnimationFrame;
    const callback = requestAnimationFrame ? (e) => {
      requestAnimationFrame(() => {
        move(e);
      });
    } : move;
    canvas.addEventListener('mousemove', callback);
    canvas.addEventListener('mouseup', () => {
      pressed = false;
    });
    canvas.addEventListener('touchmove', callback);
    return this;
  },
  scale(width, height, canvas = this.canvas) {
    const w = canvas.width;
    const h = canvas.height;
    width = width || w;
    height = height || h;
    if (width !== w || height !== h) {
      const tmpCanvas = document.createElement('canvas');
      const tmpContext = tmpCanvas.getContext('2d');
      tmpCanvas.width = width;
      tmpCanvas.height = height;
      tmpContext.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
      this.canvas = tmpCanvas;
    }
    return this;
  },
  rotate(step, image = this.canvas) {
    step = ~~step;
    if (step !== 0) {
      const maxStep = 2;
      const minStep = -1;
      if (step > maxStep) {
        step = maxStep;
      } else if (step < minStep) {
        step = minStep;
      }

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const height = image.height;
      const width = image.width;
      const degree = (step * 90 * Math.PI) / 180;

      switch (step) {
        // 逆时针旋转90°
        case -1:
          canvas.width = height;
          canvas.height = width;
          context.rotate(degree);
          context.drawImage(image, -width, 0);
          break;
        // 顺时针旋转90°
        case 1:
          canvas.width = height;
          canvas.height = width;
          context.rotate(degree);
          context.drawImage(image, 0, -height);
          break;
        // 顺时针旋转180°
        case 2:
          canvas.width = width;
          canvas.height = height;
          context.rotate(degree);
          context.drawImage(image, -width, -height);
          break;
        default:
      }
      this.canvas = canvas;
    }
    return this;
  },
  getPNGImage(canvas = this.canvas) {
    return canvas.toDataURL('image/png');
  },
  downloadPNGImage(image) {
    const url = image.replace('image/png', 'image/octet-stream;Content-Disposition:attachment;filename=test.png');
    window.location.href = url;
  },
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  },
};
export default Draw;
