import React from 'react';
import {
  StyledDiv,
  InputTitle,
  StyledSpan,
  InputArea,
  StyledInput,
  ButtonArea,
  StyledButton,
} from './BookAdd.style';
import { useRef } from 'react';
import { message as messageDialog, PageHeader, Icon } from 'antd';
import { useEffect } from 'react';

const BookAdd = ({ loading, add, getBooks, back }) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const authorRef = useRef(null);
  const urlRef = useRef(null);
  function click() {
    const title = titleRef.current.state.value;
    const message = messageRef.current.state.value;
    const author = authorRef.current.state.value;
    const url = urlRef.current.state.value;

    console.log(title, message, author, url);

    if (
      title === undefined ||
      message === undefined ||
      author === undefined ||
      url === undefined
    ) {
      messageDialog.error('다 써라');
      return;
    }
    add({
      title,
      message,
      author,
      url,
    });
  }
  return (
    <>
      <PageHeader
        onBack={back}
        title={
          <div>
            <Icon type="form" /> Add Book
          </div>
        }
        subTitle="Add Your Faborite Book"
      />
      <StyledDiv>
        <InputTitle>
          Title
          <StyledSpan />
        </InputTitle>
        <InputArea>
          <StyledInput placeholder="Title" ref={titleRef} />
        </InputArea>
        <InputTitle top={10}>
          Comment
          <StyledSpan />
        </InputTitle>
        <InputArea>
          <StyledInput placeholder="Comment" ref={messageRef} />
        </InputArea>
        <InputTitle top={10}>Author</InputTitle>
        <InputArea>
          <StyledInput placeholder="Author" ref={authorRef} />
        </InputArea>
        <InputTitle top={10}>URL</InputTitle>
        <InputArea>
          <StyledInput placeholder="URL" ref={urlRef} />
        </InputArea>
        <ButtonArea>
          <StyledButton size="large" loading={loading} onClick={click}>
            추가하기
          </StyledButton>
        </ButtonArea>
      </StyledDiv>
    </>
  );
};

export default BookAdd;
