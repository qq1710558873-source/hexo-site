// globalObserver.js - 全局单例管理器
const imageCallbacks = new Map();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 1. 从 Map 中取出该节点对应的回调函数
        const callback = imageCallbacks.get(entry.target);
        if (callback) {
          callback(); // 执行加载逻辑
          // 2. 加载后取消观察并移除记录
          observer.unobserve(entry.target);
          imageCallbacks.delete(entry.target);
        }
      }
    });
  },
  { rootMargin: '0px 0px 600px 0px' } // 提前 600px 触发
);

const observeImage = (el, callback) => {
  imageCallbacks.set(el, callback);
  observer.observe(el);
};

const unobserveImage = (el) => {
  imageCallbacks.delete(el);
  observer.unobserve(el);
};