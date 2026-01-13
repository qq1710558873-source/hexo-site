// 进度条
const ProgressBar = {
  el: null,
  timer: null,

  // 初始化并插入 DOM
  init() {
    if (this.el) return;
    this.el = document.createElement('div');
    this.el.style.cssText = `
      position: fixed; top: 0; left: 0; height: 2px;
      background: #7c4dff; z-index: 9999; width: 0%;
      transition: width 0.3s ease; box-shadow: 0 0 10px #7c4dff;
    `;
    document.body.appendChild(this.el);
  },

  // 开始跑进度
  start() {
    this.init();
    let width = 0;
    this.el.style.display = 'block';
    this.el.style.width = '0%';

    // 涓流效果：越往后跑得越慢，但永远不到 100%
    this.timer = setInterval(() => {
      if (width <= 50) {
        width += Math.random() * 6;
      } else if (width <= 90) {
        width += Math.random() * 2;
      } else {
        clearInterval(this.timer);
      }
      this.el.style.width = width + '%';
    }, 200);
  },

  // 完成加载
  finish() {
    clearInterval(this.timer);
    this.el.style.width = '100%';
    setTimeout(() => {
      this.el.style.display = 'none';
    }, 500); // 留出动画时间
  },
};
ProgressBar.start();
window.onload = () => {
  ProgressBar.finish();
};
