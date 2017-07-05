/**
 * Created by louizhai on 17/6/30.
 * description: Use canvas to draw.
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

    context.lineWidth = 10;
    context.strokeStyle = 'black';
    context.lineCap = 'round';
    context.imageSmoothingEnabled = true;
    Object.assign(context, config);

    const { left, top } = canvas.getBoundingClientRect();
    const point = {};
    const isMobile = /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent);
    let pressed = false;

    const paint = (signal) => {
      switch (signal) {
        case 1:
          context.beginPath();
          context.moveTo(point.x, point.y);
        case 2:
          context.lineTo(point.x, point.y);
          context.stroke();
          break;
        default:
      }
    };
    const create = signal => (e) => {
      if (signal === 1) {
        pressed = true;
      }
      if (signal === 1 || pressed) {
        e = isMobile ? e.touches[0] : e;
        point.x = e.clientX - left;
        point.y = e.clientY - top;
        paint(signal);
      }
    };
    const start = create(1);
    const move = create(2);
    const requestAnimationFrame = window.requestAnimationFrame;
    const optimizedMove = requestAnimationFrame ? (e) => {
      requestAnimationFrame(() => {
        move(e);
      });
    } : move;

    if (isMobile) {
      canvas.addEventListener('touchstart', start);
      canvas.addEventListener('touchmove', optimizedMove);
    } else {
      canvas.addEventListener('mousedown', start);
      canvas.addEventListener('mousemove', optimizedMove);
      canvas.addEventListener('mouseup', () => {
        pressed = false;
      });
    }
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
      canvas = tmpCanvas;
    }
    return canvas;
  },
  rotate(degree, image = this.canvas) {
    degree = ~~degree;
    if (degree !== 0) {
      const maxDegree = 180;
      const minDegree = -90;
      if (degree > maxDegree) {
        degree = maxDegree;
      } else if (degree < minDegree) {
        degree = minDegree;
      }

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const height = image.height;
      const width = image.width;
      const degreePI = (degree * Math.PI) / 180;

      switch (degree) {
        // 逆时针旋转90°
        case -90:
          canvas.width = height;
          canvas.height = width;
          context.rotate(degreePI);
          context.drawImage(image, -width, 0);
          break;
        // 顺时针旋转90°
        case 90:
          canvas.width = height;
          canvas.height = width;
          context.rotate(degreePI);
          context.drawImage(image, 0, -height);
          break;
        // 顺时针旋转180°
        case 180:
          canvas.width = width;
          canvas.height = height;
          context.rotate(degreePI);
          context.drawImage(image, -width, -height);
          break;
        default:
      }
      image = canvas;
    }
    return image;
  },
  getPNGImage(canvas = this.canvas) {
    return canvas.toDataURL('image/png');
  },
  getJPGImage(canvas = this.canvas) {
    return canvas.toDataURL('image/jpeg', 0.5);
  },
  downloadPNGImage(image, type = 'png') {
    const url = image.replace(`image/${type}`, `image/octet-stream;Content-Disposition:attachment;filename=test.${type}`);
    window.location.href = url;
  },
  dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bStr = atob(arr[1]);
    let n = bStr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bStr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  },
};
export default Draw;
