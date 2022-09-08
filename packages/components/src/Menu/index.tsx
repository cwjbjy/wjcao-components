import { useState, ReactNode, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Menu as AntdMenu } from 'antd';

export interface MenuItemType {
  label: string;
  path: string;
  icon?: ReactNode;
  disabled?: boolean;
  children?: MenuItemType[];
}

interface Props {
  menus: MenuItemType[];
  width?: number;
}

const { SubMenu, Item } = AntdMenu;

const Menu: React.FC<Props> = ({ menus, width = 256 }) => {
  const [openKeys, setOpenKeys] = useState<any[]>([]);
  const [selectedKey, setselectedKeys] = useState([menus[0]?.path]);

  const rootSubmenuKeys = useMemo(() => {
    return menus.map((o) => o.label);
  }, []);

  const onOpenChange = (keys: any[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onItemClick = useCallback(({ key }: { key: string }) => {
    setselectedKeys([key]);
  }, []);

  const renderSubMenu = useCallback((item: MenuItemType, level: number) => {
    if (item.children) {
      return (
        <SubMenu key={item.label} title={item.label} icon={item.icon}>
          {item.children.map((child) => renderSubMenu(child, level + 1))}
        </SubMenu>
      );
    } else {
      return (
        <Item
          key={item.path}
          disabled={item.disabled}
          icon={item.icon}
          className={`menu-item-level-${level}`}
        >
          {item.label}
          {/* <Link to={{ pathname: item.path }}>{item.label}</Link> */}
        </Item>
      );
    }
  }, []);

  return (
    <AntdMenu
      style={{ width }}
      selectedKeys={selectedKey}
      openKeys={openKeys}
      mode="inline"
      onOpenChange={onOpenChange}
      onClick={onItemClick}
    >
      {menus.map((menu) => renderSubMenu(menu, 0))}
    </AntdMenu>
  );
};

export default Menu;
