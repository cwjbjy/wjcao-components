---
nav:
  title: Image 图片
  path: /components
---

# Image

`Image`组件封装了图片的一系列功能，比如倍图设置，容错处理等。

## 基本使用

展示一张图片，定义图片的`width`，`height`以及`src`

```tsx
import React from 'react';
import { Image } from '@wjcao/components';

export default () => (
  <Image
    width={300}
    height={80}
    src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
  />
);
```

## 设置倍图

设置倍图可以在不同分辨的屏幕显示出合适的图片。

```tsx
import React from 'react';
import { Image } from '@wjcao/components';

export default () => (
  <Image
    width={300}
    src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
    src1x="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
    src2x="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
    src3x="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
  />
);
```

## 图片容错

当图片加载失败时，展示错误图片很影响用户体验，你可以指定`fallbackSrc`来展示出错时的图片。

为了查看效果，我设置了一张不存在的图片地址。当图片请求不到时，展示的是`fallbackSrc`的地址。

```tsx
import React from 'react';
import { Image } from '@wjcao/components';

export default () => (
  <Image
    width={300}
    src="https://baidu.com/not/exist/image/address"
    fallbackSrc="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
  />
);
```

## API

| 参数        | 说明                           | 类型                      |
| ----------- | ------------------------------ | ------------------------- |
| className   | `class` 类                     | `string`                  |
| style       | `style` 样式                   | `CSSProperties`           |
| width       | 图片的宽                       | `CSSProperties['width']`  |
| height      | 图片的高                       | `CSSProperties['height']` |
| src         | 图片地址                       | `string`                  |
| src1x       | 1 倍图地址                     | `string`                  |
| src2x       | 2 倍图地址                     | `string`                  |
| src3x       | 3 倍图地址                     | `string`                  |
| fallbackSrc | 当图片地址加载出错时展示的图片 | `string`                  |
| alt         | 图片的`alt`说明                | `string`                  |
