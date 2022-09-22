import { emit } from './base';
import { OptionType, InitOption } from '../types';

function setFullErrInfo(errorInfo: ErrorEvent | PromiseRejectionEvent) {
  const info = {
    errorInfo,
    eventType: 'error',
    url: window.location.href,
    triggerTime: Date.now(),
  };
  emit(info);
}

export function init({ errorCore }: InitOption) {
  if (!errorCore) return;

  window.addEventListener(
    'error',
    (e) => {
      setFullErrInfo(e);
    },
    true,
  );

  // promise调用链未捕获异常
  window.addEventListener('unhandledrejection', (e) => {
    setFullErrInfo(e);
  });
}

/**
 * 主动触发错误上报
 */
export function traceError(errorInfo: OptionType) {
  return setFullErrInfo(errorInfo as any as ErrorEvent);
}
