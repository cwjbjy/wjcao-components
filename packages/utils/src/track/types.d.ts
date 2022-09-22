export interface OptionType {
  eventId: number;
  message: string;
  params?: Record<string, any>;
  options?: Record<string, any>;
}

export interface InitOption {
  requestUrl: string; // 请求地址
  appName: string; // 应用名称
  maxLen?: number; //最大缓存数
  maxAwait?: number; //最大缓存时间
  pv?: boolean; // 页面跳转-是否自动发送页面跳转相关数据
  performance?: boolean; // 性能数据-是否采集首次进入页面的数据(ps: tcp连接耗时,HTML加载完成时间,首次可交互时间)
  performanceCore?: boolean; // 性能数据-是否采集静态资源、接口的相关数据
  performanceFirstResource?: boolean; // 性能数据-是否采集首次进入页面的数据(ps: tcp连接耗时,HTML加载完成时间,首次可交互时间)
  errorCore?: boolean; // 是否采集异常数据(ps: 资源引入错误,promise错误,控制台输出错误)
  eventCore?: boolean; // 页面点击-是否采集点击事件
}
