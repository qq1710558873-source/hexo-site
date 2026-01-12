hexo.extend.tag.register('LazyImage', function (args) {
  console.log('LazyImage tag loaded!', args); // 用于调试
  const [src, blurhash, alt, title] = args;
  return `
  <div class="load-img-container">
    <img data-src="${src}" class="post-img" data-zoomable />
    <img data-blurhash="${blurhash}" data-src="${src}" class="post-thumb-img lazy-load-image" />
  </div>
  `;
});
