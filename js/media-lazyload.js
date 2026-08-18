(function () {
  'use strict';

  const images = document.querySelectorAll('img[data-lazy-skeleton]');
  const videos = document.querySelectorAll('video[data-lazy-video]');

  function removeSkeleton(media) {
    media.removeAttribute('data-lazy-skeleton');
  }

  images.forEach(function (image) {
    if (image.complete) {
      removeSkeleton(image);
      return;
    }

    image.addEventListener('load', function () {
      removeSkeleton(image);
    }, { once: true });
    image.addEventListener('error', function () {
      removeSkeleton(image);
    }, { once: true });
  });

  if (!videos.length) return;

  function restoreAttribute(element, name, dataName) {
    const value = element.getAttribute(dataName);
    if (value === null) return;

    element.setAttribute(name, value);
    element.removeAttribute(dataName);
  }

  function loadVideo(video) {
    if (!video.hasAttribute('data-lazy-video')) return;

    video.addEventListener('loadedmetadata', function () {
      removeSkeleton(video);
    }, { once: true });
    video.addEventListener('error', function () {
      removeSkeleton(video);
    }, { once: true });

    restoreAttribute(video, 'src', 'data-src');
    restoreAttribute(video, 'poster', 'data-poster');
    restoreAttribute(video, 'preload', 'data-lazy-preload');

    video.querySelectorAll('source[data-src], track[data-src]').forEach(function (source) {
      restoreAttribute(source, 'src', 'data-src');
    });

    video.removeAttribute('data-lazy-video');
    video.load();

    if (video.readyState >= 1) removeSkeleton(video);
  }

  if (!('IntersectionObserver' in window)) {
    videos.forEach(loadVideo);
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      observer.unobserve(entry.target);
      loadVideo(entry.target);
    });
  }, {
    rootMargin: '300px 0px',
    threshold: 0.01
  });

  videos.forEach(function (video) {
    observer.observe(video);
  });
})();
