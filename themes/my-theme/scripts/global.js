hexo.extend.tag.register('LazyImage', function (args) {
  console.log('LazyImage tag loaded!', args); // 用于调试
  const [src, code] = args;
  console.log(src, code);
  
  const blurhash = code?.slice(0, -4);
  const width = code?.slice(-4, -2);
  const height = code?.slice(-2);
  return `
  <div class="load-img-container">
    <img data-src="${src}" decoding="async" class="post-img" data-zoomable />
    <img data-blurhash="${blurhash}" data-src="${src}" data-width="${width}" data-height="${height}" class="post-thumb-img lazy-load-image" />
  </div>
  `;
});
