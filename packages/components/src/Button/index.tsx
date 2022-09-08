import { Button as AntdButton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

interface Map {
  [propName: string]: React.ReactNode;
}

const map: Map = {
  primary: (
    <AntdButton type="primary" icon={<SearchOutlined />}>
      Primary AntdButton
    </AntdButton>
  ),
  dashed: <AntdButton type="dashed">Dashed AntdButton</AntdButton>,
};

const Button = ({ type }: { type: string }) => {
  return <>{map[type]}</>;
};

export default Button;
