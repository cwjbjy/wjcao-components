---
nav:
  title: Magnifying 放大镜
  path: /components
---

# Magnifying

## 基本使用

鼠标移到图片上可查看效果

```tsx
import React from 'react';
import { Magnifying } from '@wjcao/components';

export default () => (
  <Magnifying
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    width={500}
    height={310}
  />
);
```

## API

| 参数   | 说明       | 类型     |
| ------ | ---------- | -------- |
| url    | 地址       | `string` |
| width  | 宽度       | `number` |
| height | 高度       | `number` |
| src1x  | 1 倍图地址 | `string` |
| src2x  | 2 倍图地址 | `string` |
| src3x  | 3 倍图地址 | `string` |
