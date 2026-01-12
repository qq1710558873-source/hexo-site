// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});
// 等待页面加载完成
window.onload = function () {
  mediumZoom('[data-zoomable]', {
    margin: 16,
    scrollOffset: 8,
    background: 'rgba(0,0,0,.85)',
  });
  document.querySelectorAll('.load-img-container').forEach((el) => {
    const originImg = el.querySelector('.post-img');
    const thumbImg = el.querySelector('.post-thumb-img');
    observeImage(el, () => {
      originImg.src = originImg.dataset.src;
      originImg.onload = function () {
        thumbImg.classList.add('loaded-image');
      };
      unobserveImage(el);
    });
  });
};
document.querySelectorAll('[data-blurhash]').forEach((el) => {
  const width = 32;
  const height = 18;
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
