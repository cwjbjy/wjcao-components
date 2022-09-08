import { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import { getSize } from '../utils';

/**
 * Column properties.
 */
export interface BackgroundProps {
  /** 内联模式 */
  inline?: boolean;
  /** 背景图地址 */
  url: CSSProperties['backgroundImage'];
  /** 1倍图 */
  bg1x?: CSSProperties['backgroundImage'];
  /** 2倍图 */
  bg2x?: CSSProperties['backgroundImage'];
  /** 3倍图 */
  bg3x?: CSSProperties['backgroundImage'];
  /** 等同于`backgroundRepeat` */
  repeat?: CSSProperties['backgroundRepeat'];
  /** 等同于`backgroundPosition` */
  position?: CSSProperties['backgroundPosition'];
  /** 等同于`backgroundSize` */
  fit?: CSSProperties['backgroundSize'];
  /** 背景图宽度 */
  width: CSSProperties['width'];
  /** 背景图高度 */
  height: CSSProperties['height'];
}

/**
 * Form column.
 */
const Background: FC<BackgroundProps> = (props) => {
  return <BackgroundStyle {...props} />;
};

const BackgroundStyle = styled.div<BackgroundProps>(
  ({ inline, url, bg1x, bg2x, bg3x, repeat, position, fit, width, height }) => `
display: ${inline ? 'inline-block' : 'block'};
background-image: url(${bg1x || url});
// background-image: image-set(url(${bg1x || url}) 1x, url(${bg2x}) 2x, url(${bg3x}) 3x);
background-repeat: ${repeat};
background-position: ${position};
background-size: ${fit};
width: ${getSize(width)};
height: ${getSize(height)};
@media (min-resolution: 2dppx),
(-webkit-min-device-pixel-ratio: 2)
{
  background-image: url(${bg2x || url});
}
@media (min-resolution: 3dppx),
(-webkit-min-device-pixel-ratio: 3)
{
  background-image: url(${bg3x || url});
}
`,
);

Background.defaultProps = {
  repeat: 'no-repeat',
  position: 'center',
  fit: 'cover',
};

export default Background;
