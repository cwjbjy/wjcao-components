import { isNumber } from 'lodash';

export function getSize(size?: string | number) {
  return isNumber(size) ? `${size}px` : size;
}

export function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
