import { ReactNode } from 'react';

import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AllOutIcon from '@mui/icons-material/AllOut';
import AssessmentIcon from '@mui/icons-material/Assessment';

export interface ChildItem {
  name: string;
  link: string;
}
export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
}

const menuItems: MenuItems[] = [
  {
    items: [
      {
        name: 'Dashboard',
        link: `${process.env.REACT_APP_BASE_NAME}/dashboards`,
        icon: AssessmentIcon
      },
      {
        name: 'Outlet',
        icon: TableChartTwoToneIcon,
        link: `${process.env.REACT_APP_BASE_NAME}/outlet`,
        items: [
          {
            name: 'Groups',
            link: `${process.env.REACT_APP_BASE_NAME}/outlet/groups`
          },
          {
            name: 'Individual',
            link: `${process.env.REACT_APP_BASE_NAME}/outlet/individual`
          }
        ]
      },
      {
        name: 'Content pack',
        icon: AllOutIcon,
        link: `${process.env.REACT_APP_BASE_NAME}/content-pack`
      },
      {
        name: 'Survey',
        icon: TableChartTwoToneIcon,
        link: `${process.env.REACT_APP_BASE_NAME}/survey`
      },
      {
        name: 'User',
        icon: AllOutIcon,
        link: `${process.env.REACT_APP_BASE_NAME}/user`
      }
    ]
  }
];

export default menuItems;
