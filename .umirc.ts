import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'MyComponents',
  favicon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
  logo: '/images/logo_UI.svg',
  outputPath: 'docs-dist',
  mode: 'site',
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  ignoreMomentLocale: true,
  links: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.bootcdn.net/ajax/libs/antd/4.23.0/antd.min.css',
    },
  ],
  navs: [
    {
      title: '规范',
      path: '/spec',
    },
    {
      title: '库文档',
      path: '/modules',
      children: [
        {
          title: '@wjcao/components',
          path: '/components',
        },
        {
          title: '@wjcao/hooks',
          path: '/hooks',
        },
      ],
    },
    {
      title: 'Github',
      path: 'https://github.com/cwjbjy?tab=repositories',
    },
  ],
  menus: {
    '/components': [
      //定义该路由下的菜单栏
      {
        title: '开始使用',
        path: '/components/start',
      },
      {
        title: '通用', //分类
        children: ['Background', 'Image', 'Magnifying', 'Menu'],
      },
    ],
  },

  // more config: https://d.umijs.org/config
});
