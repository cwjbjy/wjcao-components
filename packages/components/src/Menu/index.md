---
nav:
  title: Menu 菜单栏
  path: /components
---

# Menu

## 基本使用

根据约定的数据格式，能够满足多级菜单的需求 <code src="./demos/basic.tsx" title="只展开当前父级菜单"/>

## API

| 参数  | 说明       | 类型             |
| ----- | ---------- | ---------------- |
| menus | 菜单内容   | `MenuItemType[]` |
| width | 菜单栏宽度 | `string`         |

## MenuItemType

| 参数     | 说明       | 类型             |
| -------- | ---------- | ---------------- |
| label    | 菜单项标题 | `string`         |
| path     | 跳转路径   | `string`         |
| icon     | 菜单图标   | `ReactNode`      |
| disabled | 是否禁用   | `string`         |
| children | 子菜单项   | `MenuItemType[]` |
