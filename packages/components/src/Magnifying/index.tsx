import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from '../Image';

interface Props {
  src: string;
  width: number;
  height: number;
}

type CSS = Omit<Props, 'src'>;

const Magnifying: FC<Props> = ({ src, width, height, ...restProps }) => {
  const refs = useRef<HTMLDivElement>(null);
  useEffect(function init() {
    var span = document.createElement('span');
    var box = refs.current;
    var img = document.createElement('img');
    if (box) {
      var boxWidth = box.clientWidth;
      var boxHeight = box.clientHeight;
      var scale = 2;
      span.style.position = 'absolute';
      span.style.width = boxWidth / scale + 'px'; //250px
      span.style.height = boxHeight / scale + 'px'; //155px
      span.style.display = 'none';
      span.style.overflow = 'hidden';
      span.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      span.style.cursor = 'pointer';
      box.appendChild(span);
      img.setAttribute('src', src);
      img.setAttribute('alt', '加载失败');
      img.style.width = scale * boxWidth + 'px';
      img.style.height = scale * boxHeight + 'px';
      box.onmouseover = function () {
        span.style.display = 'block';
      };
      box.onmousemove = function (e) {
        e = e || window.event;
        var x = e.clientX - box!.offsetLeft - span.clientWidth / 2;
        var y = e.clientY - box!.offsetTop - span.clientHeight / 2;
        if (x <= 0) {
          x = 0;
        }
        if (x >= boxWidth - span.clientWidth) {
          x = boxWidth - span.clientWidth;
        }
        if (y <= 0) {
          y = 0;
        }
        if (y >= boxHeight - span.clientHeight) {
          y = boxHeight - span.clientHeight;
        }
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        img.style.marginLeft = -1 * span.offsetLeft * scale - x + 'px';
        img.style.marginTop = -1 * span.offsetTop * scale - y + 'px';
        span.appendChild(img);
      };
      box.onmouseout = function () {
        span.style.display = 'none';
      };
    }
  }, []);

  return (
    <Continer ref={refs} width={width} height={height}>
      <Image src={src} width={width} height={height} {...restProps} />
    </Continer>
  );
};

export default Magnifying;

const Continer = styled.div<CSS>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
