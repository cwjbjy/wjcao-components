---
nav:
  title: Background 背景图片
  path: /components
---

## Background

## 基本使用

展示一张图片，定义图片的`width`，`height`以及`url`

```tsx
import React from 'react';
import { Background } from '@wjcao/components';

export default () => (
  <Background
    width={30}
    height={30}
    url="https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png"
  />
);
```

## 多倍图的使用

如果分辨率不同，需展示不同像素的图片，通过传`bg1x`, `bg2x`,` bg3x`来实现

```tsx
import React from 'react';
import { Background } from '@wjcao/components';

export default () => (
  <Background
    width={300}
    height={80}
    url="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
    bg1x="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
    bg2x="https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png"
    bg3x="https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png"
  />
);
```

## 内联模式

默认显示的方式是`block`形式，如果你想使用内联模式`inline-block`，可以指定`inline`为`true`。

```tsx
import React from 'react';
import { Background } from '@wjcao/components';

export default () => (
  <>
    <Background
      width={300}
      height={80}
      fit="cover"
      inline
      url="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
    />
    <Background
      width={300}
      height={80}
      fit="cover"
      inline
      url="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
    />
  </>
);
```

## API

| 参数     | 说明                       | 类型                                  |
| -------- | -------------------------- | ------------------------------------- |
| inline   | 内联模式                   | `boolean`                             |
| url      | 背景图地址                 | `CSSProperties['backgroundImage']`    |
| bg1x     | 1 倍图                     | `CSSProperties['backgroundImage']`    |
| bg2x     | 2 倍图                     | `CSSProperties['backgroundImage']`    |
| bg3x     | 3 倍图                     | `CSSProperties['backgroundImage']`    |
| repeat   | 等同于`backgroundRepeat`   | `CSSProperties['backgroundRepeat']`   |
| position | 等同于`backgroundPosition` | `CSSProperties['backgroundPosition']` |
| fit      | 等同于`backgroundSize`     | `CSSProperties['backgroundSize']`     |
| width    | 背景图宽度                 | `CSSProperties['width']`              |
| height   | 背景图高度                 | `CSSProperties['height']`             |
