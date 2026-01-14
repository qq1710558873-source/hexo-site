class LazyImage extends HTMLElement {
  constructor() {
    super();
  }

  // 当组件被插入 DOM 时触发
  connectedCallback() {
    const webp = this.getAttribute('webp-src');
    const jpg = this.getAttribute('jpg-src');
    const code = this.getAttribute('blurhash');
    const hash = code?.slice(0, -4);
    const width = code?.slice(-4, -2);
    const height = code?.slice(-2);
    blurhash.decodePromise(hash, width, height).then((imageData) => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      const imgData = ctx.createImageData(width, height);
      imgData.data.set(imageData);
      ctx.putImageData(imgData, 0, 0);
      this.querySelector('.lazy-image-thumb').src = canvas.toDataURL();
    });
    this.innerHTML = `
      <div class="lazy-image-container">
        <img onload="this.style.opacity = 1;" class="lazy-image-thumb" />
        <img onload="this.style.opacity = 1;" class="lazy-image-origin" />
      </div>
    `;

    // 懒加载
    observeImage(this, async () => {
      unobserveImage(this);
      const originImg = this.querySelector('.lazy-image-origin');
      const tempImg = new Image();
      tempImg.src = webp || jpg;
      try {
        await tempImg.decode();
        originImg.src = tempImg.src;
      } catch (error) {
        console.error('图片解码失败:', error);
      }
    });
  }
}

// 2. 注册组件，标签名必须带连字符 "-"
customElements.define('lazy-image', LazyImage);
