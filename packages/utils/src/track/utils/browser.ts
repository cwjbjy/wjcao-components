import SparkMD5 from 'spark-md5';

export function getUUID() {
  const canvasFP = getCanvasFP();
  const webglFP = getWebglFP();
  const browserFP = getBrowserFP();
  const spark = new SparkMD5();
  spark.appendBinary(canvasFP);
  webglFP && spark.appendBinary(webglFP);
  spark.append(browserFP);
  return spark.end();
}

function bin2hex(s: string) {
  let i,
    l,
    o = '',
    n;

  s += '';

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16);
    o += n.length < 2 ? '0' + n : n;
  }

  return o;
}

// 1.浏览器指纹
function getBrowserFP() {
  const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints,
    colorDepth: window.screen.colorDepth,
    language: navigator,
    timeOffset: new Date().getTimezoneOffset(),
  };

  return JSON.stringify(info);
}
// 2.canvas指纹
function getCanvasFP() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const txt = '企业预警通';
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = 'ideographic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText(txt, 4, 17);
  }

  const b64 = canvas.toDataURL().replace('data:image/png;base64,', '');
  // window.atob 用于解码使用 base-64 编码的字符串
  const bin = window.atob(b64);
  return bin2hex(bin.slice(-16, -12));
}

function getWebglCanvas() {
  let canvas = document.createElement('canvas');
  let gl = null;
  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch (e) {
    /* squelch */
  }
  if (!gl) {
    gl = null;
  }
  return gl;
}
// 3.Webgl指纹
function getWebglFP() {
  let gl: any;
  gl = getWebglCanvas();
  if (!gl) {
    return null;
  }
  let result = [];
  const vShaderTemplate =
    'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}';
  const fShaderTemplate =
    'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}';
  const vertexPosBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
  const vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  vertexPosBuffer.itemSize = 3;
  vertexPosBuffer.numItems = 3;
  const program = gl.createProgram();
  const vshader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vshader, vShaderTemplate);
  gl.compileShader(vshader);
  const fshader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fshader, fShaderTemplate);
  gl.compileShader(fshader);
  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  gl.useProgram(program);
  program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex');
  program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset');
  gl.enableVertexAttribArray(program.vertexPosArray);
  gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
  gl.uniform2f(program.offsetUniform, 1, 1);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
  try {
    result.push(gl.canvas.toDataURL());
  } catch (e) {
    /* .toDataURL may be absent or broken (blocked by extension) */
  }
  if (result[0]) {
    return window.atob(result[0].replace('data:image/png;base64,', ''));
  }
  return null;
}

//获取屏幕缩放比例
export function getRatio() {
  let ratio = 0;
  let screen: any = window.screen;
  let ua = navigator.userAgent.toLowerCase();
  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }
  return ratio;
}
// 获取浏览器名称 使用惰性函数优化
let getBrowserName = () => {
  const name = (() => {
    let userAgent = navigator.userAgent;
    if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
      return 'Opera';
    } else if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) {
      return 'IE';
    } else if (userAgent.indexOf('Edge') > -1) {
      return 'Edge';
    } else if (userAgent.indexOf('Firefox') > -1) {
      return 'Firefox';
    } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
      return 'Safari';
    } else if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
      return 'Chrome';
    } else if ('ActiveXObject' in window) {
      return 'IE>=11';
    } else if (userAgent.indexOf('opera') > -1) {
      return 'Opera';
    } else if (/qqbrowser/.test(userAgent)) {
      return 'QQBrowser';
    } else if (/MicroMessenger/i.test(userAgent)) {
      return 'WeixinBrowser';
    }
  })();
  getBrowserName = () => name;
  return name;
};

export let getBrowserNameVersion = () => {
  const browser = getBrowserName();
  const version = (() => {
    let userAgent = navigator.userAgent.toLowerCase();
    if (browser) {
      if (browser === 'IE') {
        return userAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)?.[2];
      } else if (browser === 'Chrome') {
        for (var mt in navigator.mimeTypes) {
          //检测是否是360浏览器(测试只有pc端的360才起作用)
          if (navigator.mimeTypes[mt]['type'] === 'application/360softmgrplugin') {
            return '360';
          }
        }
        return userAgent.match(/chrome\/([\d.]+)/)?.[1];
      } else if (browser === 'Firefox') {
        return userAgent.match(/firefox\/([\d.]+)/)?.[1];
      } else if (browser === 'Opera') {
        return userAgent.match(/opera\/([\d.]+)/)?.[1];
      } else if (browser === 'Safari') {
        return userAgent.match(/version\/([\d.]+)/)?.[1];
      } else if (browser === 'Edge') {
        return userAgent.match(/edge\/([\d.]+)/)?.[1];
      } else if (browser === 'QQBrowser') {
        return userAgent.match(/qqbrowser\/([\d.]+)/)?.[1];
      }
    }
  })();
  getBrowserNameVersion = () => ({ browser, browser_version: version });
  return { browser, browser_version: version };
};
