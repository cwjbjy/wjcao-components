import { sendBeacon, nextTime } from '../utils/methods';
import baseLog from '../utils/data';
import { InitOption } from '../types';

let requestUrl = ''; // 服务请求地址
let maxLen = 0; // 最大缓存数
let maxAwait = 0; // 最大等待时间
let events: any = []; // 批次队列
let timer: any = null; // 定时发送定时器
// 基础数据
const base = baseLog();

export const init = (options: InitOption) => {
  requestUrl = options.requestUrl;
  maxLen = options.maxLen || 5;
  maxAwait = options.maxAwait || 5000;
};

/**
 * 记录需要发送的埋点数据
 * @param {*} e 需要发送的事件信息
 * @param {boolean} flush 是否立即发送
 */
export const emit = (e: any, flush = false) => {
  events = events.concat(e); // 追加到事件队列里
  console.log('receive event, waiting to send', e);
  clearTimeout(timer);

  // 满足最大记录数,立即发送,否则定时发送(flush为true代表立即发送)
  events.length >= maxLen || flush
    ? send()
    : (timer = setTimeout(() => {
        send();
      }, maxAwait));
};

/**
 * 发送埋点信息
 */
function send() {
  if (events.length) {
    console.log('send events', events);
    //事件超过最大限制则分批发送
    const sendEvents = events.slice(0, maxLen); // 需要发送的事件
    events = events.slice(maxLen); // 剩下待发的事件
    const time = Date.now();
    sendBeacon(requestUrl, {
      baseInfo: {
        ...base,
        sendTime: time,
      },
      eventInfo: sendEvents,
    });
    if (events.length) nextTime(send); // 继续传输剩余内容,在下一个时间择机传输
  }
}
