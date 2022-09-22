---
nav:
  path: /utils
  title: track
---

# track

数据埋点

### 自动监听

将 `track.init` 方法挂载到全局，在 `network` 中查看效果

```tsx
import React from 'react';
import { track } from '@wjcao/utils';

export default () => {
  track.init({
    requestUrl: '11',
    appName: '22',
    pv: true,
    performance: true,
    performanceCore: true,
    errorCore: true,
    eventCore: true,
  });
  return <button>点击</button>;
};
```

### 手动触发

调用`track.methods.traceCustomEvent`手动触发，在 `network` 中查看效果

```tsx
import React from 'react';
import { track } from '@wjcao/utils';

export default () => {
  track.init({
    requestUrl: '11',
    appName: '22',
  });
  const hanldeClick = () => {
    track.methods.traceCustomEvent({ eventId: 1, message: '2', params: {} });
  };
  return <button onClick={hanldeClick}>点击</button>;
};
```

## API

| 参数            | 说明                           | 类型      |
| --------------- | ------------------------------ | --------- |
| requestUrl      | 上传 url 地址                  | `string`  |
| appName         | 项目名称                       | `string`  |
| maxLen          | 最大缓存数                     | `number`  |
| maxAwait        | 最大缓存时间                   | `number`  |
| pv              | 是否自动发送页面跳转相关数据   | `boolean` |
| performance     | 是否自动采集首次进入页面的数据 | `boolean` |
| performanceCore | 是否自动采集静态资源           | `boolean` |
| errorCore       | 是否自动采集异常数据           | `boolean` |
| eventCore       | 是否自动采集点击事件           | `boolean` |

## methods

| 参数               | 说明               |
| ------------------ | ------------------ |
| `traceError`       | 手动上报错误       |
| `tracePerformance` | 手动上报性能数据称 |
| `traceCustomEvent` | 手动上报点击事件   |
| `tracePageView`    | 手动上报路由事件   |
