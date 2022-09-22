import * as base from './lib/base';
import * as pv from './lib/pv';
import * as err from './lib/err';
import * as event from './lib/event';
import * as performance from './lib/performance';
import { InitOption } from './types';

const methods = {
  traceError: err.traceError,
  tracePerformance: performance.tracePerformance,
  traceCustomEvent: event.traceCustomEvent,
  tracePageView: pv.tracePageView,
};

const init = (options: InitOption) => {
  const _options: InitOption = {
    requestUrl: '',
    appName: '',
    pv: false,
    performanceCore: false,
    performanceFirstResource: false,
    errorCore: false,
    eventCore: false,
  };

  // 将传过来的参数转换
  transitionOptions(_options, options);

  base.init(_options);
  event.init(_options);
  pv.init(_options);
  err.init(_options);
  //@ts-ignore
  performance.init(_options);
};

const transitionOptions = (_options: InitOption, options: InitOption) => {
  const {
    requestUrl,
    appName,
    pv = {},
    performance, //监听首屏渲染性能
    performanceCore, //监听资源加载性能
    errorCore,
    eventCore,
  } = options;

  if (!requestUrl) throw Error('请传入requestUrl参数');
  if (!appName) throw Error('请传入appName参数');

  _options.requestUrl = requestUrl;
  _options.appName = appName;

  if (typeof pv === 'boolean') {
    _options.pv = pv;
  }

  if (typeof performance === 'boolean') {
    _options.performanceFirstResource = performance;
  }

  if (typeof performanceCore === 'boolean') {
    _options.performanceCore = performanceCore;
  }

  if (typeof errorCore === 'boolean') {
    _options.errorCore = errorCore;
  }

  if (typeof eventCore === 'boolean') {
    _options.eventCore = eventCore;
  }
};

export default { init, methods };
