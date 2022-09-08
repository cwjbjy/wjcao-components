import {
  CSSProperties,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { isString } from 'lodash';
import { getSize } from '../utils';
import './index.less';

export interface ImageProps
  extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  className?: string;
  style?: CSSProperties;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  src: string;
  src1x?: string;
  src2x?: string;
  src3x?: string;
  fallbackSrc?: string;
  alt?: string;
}

const Image = (props: ImageProps) => {
  const { src, src1x, src2x, src3x, width, height, alt, fallbackSrc, ...restProps } = props;

  const [showFallback, setShowFallback] = useState(false);

  const handleOnError = useCallback(() => {
    if (isString(fallbackSrc)) {
      setShowFallback(true);
    }
  }, [fallbackSrc]);

  const srcSet = useMemo(() => {
    let srcSet = '';
    if (src1x) {
      srcSet += `${src1x}`;
    }
    if (src2x) {
      srcSet += `, ${src2x} 2x`;
    }
    if (src3x) {
      srcSet += `, ${src3x} 3x`;
    }
    if (srcSet) return { srcSet };
    return {};
  }, [src1x, src2x, src3x]);

  if (isString(fallbackSrc) && showFallback) {
    return (
      <img
        width={getSize(width)}
        height={getSize(height)}
        src={fallbackSrc}
        alt={alt}
        {...restProps}
      />
    );
  }

  return (
    <img
      width={getSize(width)}
      height={getSize(height)}
      src={src}
      alt={alt}
      onError={handleOnError}
      {...srcSet}
      {...restProps}
    />
  );
};

export default Image;
