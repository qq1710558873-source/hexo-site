// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});
// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function () {
  mediumZoom('[data-zoomable]', {
    margin: 16,
    scrollOffset: 8,
    background: 'rgba(0,0,0,.85)',
  });
});
document.querySelectorAll('.load-img-container').forEach((el) => {
  const originImg = el.querySelector('.post-img');
  const thumbImg = el.querySelector('.post-thumb-img');
  observeImage(el, async () => {
    unobserveImage(el);
    // 异步解码
    const tempImg = new Image();
    tempImg.src = originImg.dataset.src;
    try {
      await tempImg.decode();
      originImg.src = tempImg.src;
      requestAnimationFrame(() => {
        thumbImg.classList.add('loaded-image');
      });
    } catch (error) {
      console.error('图片解码失败:', error);
    }
  });
});
document.querySelectorAll('[data-blurhash]').forEach((el) => {
  const width = el.dataset.width;
  const height = el.dataset.height;
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

const container = document.querySelector('.homepage');
const img = document.querySelector('.homepage .background');

let ticking = false;

// window.addEventListener('mousemove', (e) => {
//   if (!ticking) {
//     if (e.target != container) {
//       img.style.transform = `translate(0px, 0px) scale(1)`;
//       return;
//     }
//     // 使用 requestAnimationFrame 优化性能
//     window.requestAnimationFrame(() => {
//       const rect = container.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;
//       const moveX = e.clientX - centerX;
//       const moveY = e.clientY - centerY;

//       const sensitivity = 50;
//       const x = moveX / sensitivity;
//       const y = moveY / sensitivity;
//       img.style.transform = `translate(${x}px, ${y}px) scale(1.02)`; // 稍微放大防止露底

//       ticking = false;
//     });
//     ticking = true;
//   }
// });

let ticking2 = false;
window.addEventListener('scroll', () => {
  if (!ticking2) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      img.style.transform = `translate3d(0px, ${scrollY * 0.5}px, 0px)`;
      ticking2 = false;
    });
    ticking2 = true;
  }
});
