import {
  BankOutlined,
  AppstoreOutlined,
  DeploymentUnitOutlined,
  CloudUploadOutlined,
  MailOutlined,
  SettingOutlined,
  BarChartOutlined,
  BranchesOutlined,
  BlockOutlined,
  GlobalOutlined,
  SearchOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Menu } from '@wjcao/components';

const menus = [
  {
    label: '系统首页',
    path: '/home/firstItem',
    icon: <BankOutlined />,
  },
  {
    label: '模拟航线',
    path: '/home/fleet',
    icon: <BranchesOutlined />,
  },
  {
    label: '图片上传',
    path: '/home/fileUp',
    icon: <CloudUploadOutlined />,
  },
  {
    label: '文件预览',
    path: '/home/pdf',
    icon: <MailOutlined />,
  },
  {
    label: '基础图表',
    path: '/home/baseEcharts',
    icon: <BarChartOutlined />,
  },
  {
    label: '基础表格',
    path: '/home/baseTable',
    icon: <AppstoreOutlined />,
  },
  {
    label: '拖拽组件',
    icon: <BlockOutlined />,
    children: [
      {
        label: '拖拽列表',
        path: '/home/drag/dragList',
      },
      {
        label: '拖拽弹框',
        path: '/home/drag/dragDialog',
      },
    ],
  },
  {
    label: '语言转换',
    icon: <GlobalOutlined />,
    path: '/home/I18n',
  },
  {
    label: '流程图',
    key: 'flowChart',
    icon: <DeploymentUnitOutlined />,
    children: [
      {
        label: '一般流程图',
        path: '/home/chart/commonChart',
      },
      {
        label: '定位流程图',
        path: '/home/chart/positionChart',
      },
      {
        label: '折叠流程图',
        path: '/home/chart/foldChart',
      },
    ],
  },
  {
    label: '放大镜',
    path: '/home/magnifying',
    icon: <SearchOutlined />,
  },
  {
    label: '聊天室',
    path: '/home/chatRoom',
    icon: <MessageOutlined />,
  },
  {
    label: '后台管理',
    path: '/home/manage',
    disabled: true,
    icon: <SettingOutlined />,
  },
];

const BasicMenu = () => {
  return <Menu menus={menus} />;
};

export default BasicMenu;
