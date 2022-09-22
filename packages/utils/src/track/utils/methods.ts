//数据上传
export const sendBeacon = navigator.sendBeacon
  ? (url: string, data: any) => {
      if (data) navigator.sendBeacon(url, JSON.stringify(data));
    }
  : (url: string, data: any) => {
      // 传统方式传递参数
      const beacon = new Image();
      beacon.src = `${url}?v=${encodeURIComponent(JSON.stringify(data))}`;
    };

//异步方法
export const nextTime =
  window.requestIdleCallback ||
  window.requestAnimationFrame ||
  ((callback) => setTimeout(callback, 17));
