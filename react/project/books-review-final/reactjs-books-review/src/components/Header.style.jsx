import styled from 'styled-components';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

export const StyledHeader = styled(Layout.Header)`
  background-color: white;
`;

export const StyledLink = styled(Link)`
  font-family: Roboto;
  font-size: 18px;
  color: #642828;
  text-transform: uppercase;
  text-align: center;
  &:hover {
    color: #642828;
  }
`;

export const StyledHome = styled.div`
  width: 120px;
  height: 64px;
  float: left;
  margin-right: 20px;
`;
