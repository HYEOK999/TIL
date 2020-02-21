import React, { useEffect } from 'react';
import { Col } from 'antd';
import styled from 'styled-components';
import { Button, Input, Divider, message } from 'antd';
import { Link } from 'react-router-dom';

const Title = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  text-transform: uppercase;
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
  margin-top: 60px;
  text-align: center;
`;

const InputTitle = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: ${props => props.top || '40'}px;
  text-align: left;
  padding-left: 40px;
`;

const InputArea = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  border-radius: 1px;
  border-width: 1px;
  font-family: Roboto;
`;

const ButtonArea = styled.div`
  text-align: left;
  padding-left: 40px;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
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

const DividerArea = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  margin-top: 30px;
  text-align: left;
  padding-left: 40px;
  padding-right: 40px;
`;

const LinkArea = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 15px;
  overflow: hidden;
`;

const LinkTitle = styled.div`
  float: left;
  padding-top: 5px;
`;

const StyledSpan = styled.span.attrs(() => ({
  children: '*',
}))`
  color: #971931;
`;

const LinkButtonArea = styled.div`
  float: right;
`;

const LinkButton = styled(Button)`
  background-color: #f3f7f8;
  border-color: #28546a;
  color: #28546a;
  text-transform: uppercase;
  border-radius: 1px;
  border-width: 2px;
  &:hover {
    background-color: #28546a;
    color: white;
  }
`;

const StyledCol = styled(Col).attrs(() => ({
  span: 12,
}))`
  vertical-align: top;
`;

const SigninForm = ({ loading, login, error }) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  function click() {
    const email = emailRef.current.state.value;
    const password = passwordRef.current.state.value;

    login(email, password);
  }

  useEffect(() => {
    console.log(error);

    if (error === null) return;

    if (error.response.data.error === 'USER_NOT_EXIST') {
      message.error('유저가 없습니다.');
    } else if (error.response.data.error === 'PASSWORD_NOT_MATCH') {
      message.error('비밀번호가 틀렸습니다.');
    } else {
      message.error('로그인에 문제가 있습니다.');
    }
  }, [error]);

  return (
    <StyledCol>
      <form>
        <Title>Log In. Start Searching.</Title>
        <InputTitle>
          Email
          <StyledSpan />
        </InputTitle>
        <InputArea>
          <StyledInput
            placeholder="Email"
            autoComplete="email"
            name="email"
            ref={emailRef}
          />
        </InputArea>
        <InputTitle top={10}>
          Password
          <StyledSpan />
        </InputTitle>
        <InputArea>
          <StyledInput
            type="password"
            autoComplete="current-password"
            ref={passwordRef}
          />
        </InputArea>
        <ButtonArea>
          <StyledButton size="large" loading={loading} onClick={click}>
            Sign In
          </StyledButton>
        </ButtonArea>
        <DividerArea>
          <Divider />
        </DividerArea>
        <LinkArea>
          <LinkTitle>Need to create an account?</LinkTitle>
          <LinkButtonArea>
            <Link to="/signup">
              <LinkButton>Sign up</LinkButton>
            </Link>
          </LinkButtonArea>
        </LinkArea>
        <LinkArea>
          <LinkTitle>Forgot your password?</LinkTitle>
          <LinkButtonArea>
            <Link to="/forgot">
              <LinkButton>Recovery</LinkButton>
            </Link>
          </LinkButtonArea>
        </LinkArea>
      </form>
    </StyledCol>
  );
};

export default SigninForm;
