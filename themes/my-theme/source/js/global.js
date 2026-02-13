// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});
const img = document.querySelector('.homepage .background');
// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function () {
  mediumZoom('[data-zoomable]', {
    margin: 16,
    scrollOffset: 100,
    background: 'rgba(0,0,0,.85)',
  });
  let autoScrollSpeed = 3; // 每次重绘滚动的像素
  let scrolling = true;

  function scrollToWithEasing(targetY, duration) {
    const startTime = performance.now();

    // 这是一个 easeInOutCubic 缓动函数
    function easing(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 到 1

      window.scrollTo(0, targetY * easing(progress));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    img && requestAnimationFrame(step);
  }

  // 用 2000 毫秒滚到 1000px 的位置
  scrollToWithEasing(600, 2000);
});
/**
 * 图片懒加载
 */
document.querySelectorAll('.load-img-container').forEach((el) => {
  const originImg = el.querySelector('.post-img');
  const thumbImg = el.querySelector('.post-thumb-img');
  observeImage(el, async () => {
    unobserveImage(el);
    // 异步解码
    // const tempImg = new Image();
    // tempImg.src = originImg.dataset.src;
    // try {
    //   await tempImg.decode();
    //   originImg.src = tempImg.src;
    //   requestAnimationFrame(() => {
    //     thumbImg.classList.add('loaded-image');
    //   });
    // } catch (error) {
    //   console.error('图片解码失败:', error);
    // }
    // 不使用异步解码
    requestAnimationFrame(() => {
      originImg.src = originImg.dataset.src;
      originImg.onload = () => {
        originImg.style.opacity = 1;
        thumbImg.style.opacity = 0;
      };
      thumbImg.classList.add('loaded-image');
    });
  });
});

/**
 * 解码占位图
 */
document.querySelectorAll('[data-blurhash]').forEach((el) => {
  const width = el.dataset.width || 8;
  const height = el.dataset.height || 8;
  blurhash.decodePromise(el.dataset.blurhash, width, height).then((imageData) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const imgData = ctx.createImageData(width, height);
    imgData.data.set(imageData);
    ctx.putImageData(imgData, 0, 0);
    el.src = canvas.toDataURL();
  });
});

const info = document.querySelector('.homepage .info');
/**
 * 滚动事件监听
 */
let ticking2 = false;
const navbar = document.querySelector('.navbar-wrapper');
window.addEventListener('scroll', () => {
  if (!ticking2 && img) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      img.style.transform = `translate3d(0px, ${scrollY * 0.75}px, 0px)`;
      info.style.transform = `translate(-50%, ${scrollY * 0.45}px)`;
      ticking2 = false;
      // 滚动到 600px 时添加类名
      if (scrollY >= 400) {
        navbar.classList.add('navbar-fixed');
      } else {
        navbar.classList.remove('navbar-fixed');
      }
    });
    ticking2 = true;
  }
});

/**
 * 元素加载动画
 */
document.querySelectorAll('.load-dom').forEach((el) => {
  const cardCover = el.querySelector('.card-cover');
  observeImage(el, async () => {
    if (cardCover) {
      await cardCover.decode();
      requestAnimationFrame(() => {
        el.classList.add('load-animation');
        el.classList.remove('load-dom');
        unobserveImage(el);
      });
    } else {
      requestAnimationFrame(() => {
        el.classList.add('load-animation');
        el.classList.remove('load-dom');
        unobserveImage(el);
      });
    }
  });
});

// 主题切换功能
(function() {
  'use strict';
  
  const STORAGE_KEY = 'theme-preference';
  
  // 获取当前主题
  function getCurrentTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // 应用主题
  function applyTheme(theme, useTransition = false) {
    const apply = () => {
      const oldTheme = document.documentElement.style.colorScheme || 'light';
      document.body.classList.remove(`mdui-theme-layout-${oldTheme}`);
      document.documentElement.style.colorScheme = theme;
      document.body.classList.add(`mdui-theme-layout-${theme}`);
      
      // 更新图标显示
      const sunIcon = document.querySelector('.theme-toggle .sun-icon');
      const moonIcon = document.querySelector('.theme-toggle .moon-icon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    };
    
    if (useTransition && document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }
  
  // 切换主题
  window.toggleTheme = function() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(newTheme, true);
  };
  
  // 初始化主题
  document.addEventListener('DOMContentLoaded', function() {
    const theme = getCurrentTheme();
    applyTheme(theme);
  });
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    // 只有在用户没有手动设置过主题时才跟随系统
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light', true);
    }
  });
})();
