import { getUUID, getRatio, getBrowserNameVersion } from './browser';

// 生成最终数据格式
export default function baseLog() {
  const navigator = window.navigator;
  const browserInfo = getBrowserNameVersion();
  const ratio = getRatio();
  const uuid = getUUID();
  return {
    os: navigator.platform,
    uuid: uuid,
    browser: browserInfo.browser,
    browser_version: browserInfo.browser_version,
    ratio,
    resolution: `${window.screen.width}*${window.screen.height}`,
  };
}
