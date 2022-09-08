---
nav:
  path: /hooks
  title: useBlobUrl
---

# useBlobUrl

通过传入文件内容，获取文件流地址。

## 代码示例

### 基础用法

```tsx
/**
 * title: 基础用法
 * desc: 此处将如下一段base64图片转换为一个blob地址
 */
import React from 'react';
import { useBlobUrl } from '@wjcao/hooks';

export default function Demo() {
  const imageBase64 =
    'data:image/png;base64,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';
  const url = useBlobUrl(imageBase64);

  return (
    <div>
      <img src={url} alt="示例图片" />
    </div>
  );
}
```

## API

```typescript
const url = useBlobUrl(imgBase64: string): string;
```

### 参数

| 参数      | 说明             | 类型     | 默认值 |
| --------- | ---------------- | -------- | ------ |
| imgBase64 | 图片 base64 地址 | `string` | -      |

### 返回值

| 参数 | 说明                       | 类型     |
| ---- | -------------------------- | -------- |
| url  | 转换后生成的 blob url 地址 | `string` |
