import { emit } from './base';
import { OptionType, InitOption } from '../types';
/**
 * 点击事件全埋点
 */
function clickCollection() {
  document.addEventListener(
    'click',
    (e: any) => {
      // 点击事件
      const config = {
        eventType: 'click',
        url: window.location.href,
        target: e.target.outerText,
        triggerTime: Date.now(),
      };
      emit(config);
    },
    true,
  );
}

export function init({ eventCore }: InitOption) {
  if (!eventCore) return;
  clickCollection();
}

/**
 * 主动触发事件上报
 */
export function traceCustomEvent({ eventId, message, params }: OptionType) {
  emit({
    eventId,
    message,
    params,
    eventType: 'custom',
    triggerTime: Date.now(),
  });
}
