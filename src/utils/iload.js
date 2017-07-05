/**
 * Created by louiszhai on 17/6/19.
 * description: Asynchronous sequential loading resources.
 */
const head = document.getElementsByTagName('head').item(0);

// 加载script标签
function loadScript(path, isSync, callback) {
  const script = document.createElement('script');
  script.async = !!isSync;
  script.src = path;
  if (typeof callback === 'function') {
    script.addEventListener('load', callback);
  }
  head.appendChild(script);
}

// 异步加载顺序执行多个script脚本
const iload = (...rest) => {
  let pathLength = rest.length;
  let callback;
  if (pathLength === 0) {
    return false;
  } else if (typeof rest[pathLength - 1] === 'function') {
    pathLength--;
    callback = rest[pathLength];
  }
  if (pathLength === 0) {
    return false;
  } else if (pathLength === 1) {
    loadScript(rest[0], false, callback);
  } else {
    for (let i = 0; i < pathLength; i++) {
      if (i === pathLength - 1) {
        loadScript(rest[i], true, callback);
      } else {
        loadScript(rest[i], true);
      }
    }
  }
};

export default {
  install: (Vue, name = 'iload') => {
    Object.defineProperty(Vue.prototype, name, { value: iload });
  },
};

