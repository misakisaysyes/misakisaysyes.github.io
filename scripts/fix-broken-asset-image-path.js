'use strict';

function getPostBase(data) {
  if (data.path) {
    return `/${data.path.replace(/index\.html$/, '')}`;
  }

  if (data.permalink) {
    try {
      return new URL(data.permalink).pathname.replace(/index\.html$/, '');
    } catch (err) {
      return data.permalink.replace(/index\.html$/, '');
    }
  }

  return '/';
}

hexo.extend.filter.register('after_post_render', function(data) {
  const base = getPostBase(data);
  const fields = ['excerpt', 'more', 'content'];

  for (const field of fields) {
    if (typeof data[field] !== 'string') continue;

    data[field] = data[field].replace(
      /(<(?:img|source)\b[^>]*\bsrc=["'])\/\.com\/\/([^"']+)(["'][^>]*>)/g,
      `$1${base}$2$3`
    );
  }

  return data;
}, 99);
