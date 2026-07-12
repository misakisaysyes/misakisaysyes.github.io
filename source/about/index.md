---
title: about
date: 2020-08-27 14:49:17
type: "about"
---

Hi，我是谭，misakisaysyes是我的网号。

目前在北京，是一名不是在工作就是在找工作路上的互联网研发（偏前端）。

这个博客主要用于记录当下工作、生活、学习和思考的一些片段，既留给未来的自己，也分享给偶尔路过的朋友们。

内容不定期更新，有新的经历和想法时再来补充。


附 我的历史足迹（持续更新中）：
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    #china-map {
      width: 100%;
      height: 580px;
      border: 1px solid #eee;
    }
    /* 自定义tooltip放大字体 */
    .custom-tooltip {
      font-size: 12px !important;
      color: #666 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    /* 隐藏右下角版权小字，页面更干净 */
    .leaflet-control-attribution {
      display: none !important;
    }
  </style>
</head>
<body>
  <div id="china-map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('china-map', {
      maxBounds: [[54, 73], [4, 136]],
      maxBoundsViscosity: 1.0,
      minZoom: 4,
      maxZoom: 8,
      zoomControl: true
    }).setView([36.8, 104.2], 4);
    // 底层：Carto淡边界无底图文字
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png', {
      subdomains: ['a', 'b', 'c', 'd'],
      attribution: '&copy; CARTO',
      minZoom: 4,
      maxZoom: 8
    }).addTo(map);
    const chinaPoints = [
      { lat: 39.9042, lng: 116.4074, tip: "北京-在人间", type: 1 },
      { lat: 26.6570, lng: 106.6302, tip: "贵州-贵阳-童年", type: 1 },
      { lat: 39.1303, lng: 117.1993, tip: "天津", type: 2 },
      { lat: 32.6570, lng: 110.7840, tip: "湖北-十堰", type: 2 },
      { lat: 34.2631, lng: 108.9424, tip: "陕西-西安", type: 2 },
      { lat: 32.8260, lng: 109.9140, tip: "陕西-白河", type: 2 },
      { lat: 32.0603, lng: 118.7969, tip: "江苏-南京", type: 2 },
      { lat: 37.5107, lng: 122.1165, tip: "山东-威海", type: 2 },
      { lat: 24.4798, lng: 118.0894, tip: "福建-厦门", type: 2 },
      { lat: 37.6882, lng: 112.7532, tip: "山西-榆次", type: 2 },
      { lat: 37.8706, lng: 112.5489, tip: "山西-太原", type: 2 },
      { lat: 40.0937, lng: 113.2910, tip: "山西-大同", type: 2 },
      { lat: 31.2304, lng: 121.4737, tip: "上海-我的大学", type: 1 },
      { lat: 30.7461, lng: 120.7555, tip: "浙江-嘉兴", type: 2 },
      { lat: 22.5830, lng: 113.0800, tip: "广东-江门", type: 2 },
      { lat: 22.5787, lng: 113.0676, tip: "广东-广州", type: 2 },
      { lat: 27.0476, lng: 108.4143, tip: "贵州-镇远", type: 2 }
    ];
    // 批量渲染小圆点标记
    chinaPoints.forEach(item => {
      const color = item.type === 1 ? '#cc8888' : '#7399cc';
      L.circleMarker([item.lat, item.lng], {
        radius: 6,         // 标记尺寸，小巧不遮挡地图
        fillColor: color,
        color: '#ffffff',  // 白色细描边，区分圆点
        weight: 1,
        fillOpacity: 0.92
      })
      .addTo(map)
      .bindTooltip(item.tip, { offset: [0, -10], className: 'custom-tooltip' });
    })
  </script> 
</body>
</html>









 
