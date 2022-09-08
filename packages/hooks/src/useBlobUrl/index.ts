import { useEffect, useState } from 'react';

const signatures: Record<string, string> = {
  JVBERi0: 'application/pdf',
  R0lGODdh: 'image/gif',
  R0lGODlh: 'image/gif',
  iVBORw0KGgo: 'image/png',
};

const detectMimeType = (base64: string) => {
  for (const s in signatures) {
    if (Object.prototype.hasOwnProperty.call(signatures, s)) {
      if (base64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }
};

/**
 * base64转blob url
 * @param {string} imgBase64 base64图片
 * @return {string} blob地址
 */
export default function useBlobUrl(imgBase64: string) {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    let blobUrl: string;
    if (imgBase64) {
      const base64Code = imgBase64.split(',')[1];
      const mimeType = detectMimeType(base64Code);
      const bytes = window.atob(base64Code);
      const ab = new ArrayBuffer(bytes.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      const blob = new Blob([ia], { type: mimeType });
      blobUrl = window.URL.createObjectURL(blob);
      setUrl(blobUrl);
    }

    return () => {
      if (blobUrl) {
        window.URL.revokeObjectURL(blobUrl);
      }
    };
  }, [imgBase64]);

  return url;
}
