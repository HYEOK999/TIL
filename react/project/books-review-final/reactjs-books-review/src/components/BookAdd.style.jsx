import styled from 'styled-components';
import { Input, Button } from 'antd';

export const StyledDiv = styled.div`
  width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const InputTitle = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: ${props => props.top || '40'}px;
  text-align: left;
  padding-left: 40px;
`;

export const InputArea = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const StyledInput = styled(Input)`
  width: 520px;
  border-radius: 1px;
  border-width: 1px;
  font-family: Roboto;
  margin-left: 40px;
  margin-right: 40px;
`;

export const ButtonArea = styled.div`
  text-align: right;
  padding-right: 40px;
  margin-top: 20px;
`;

export const StyledButton = styled(Button)`
  border-color: #28546a;
  background-color: #28546a;
  text-transform: uppercase;
  border-radius: 1px;
  border-width: 2px;
  color: white;
  width: 120px;
  &:hover {
    background-color: #28546a;
    color: white;
  }
`;

export const StyledSpan = styled.span.attrs(() => ({
  children: '*',
}))`
  color: #971931;
`;
