import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

export const StyledMenu = styled(Menu).attrs(() => ({
  theme: 'light',
  mode: 'horizontal',
}))`
  line-height: 64px;
  height: 64px;
`;

export const MenuItem = styled(Menu.Item)``;

export const StyledLink = styled(Link)`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.65);
  text-transform: uppercase;
  text-align: center;
`;

export const StyledLogoutButton = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
  &:hover {
    color: #1890ff;
  }
`;

export const StyledMenuSubMenu = styled(Menu.SubMenu)`
  width: 200px;
  float: right;
  text-align: center;
`;

export const StyledUser = styled.div`
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.65);
`;
