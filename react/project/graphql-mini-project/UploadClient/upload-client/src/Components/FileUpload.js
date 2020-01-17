import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
// useDropzone : 드래그앤 드롭 해서 업로드 되는 모듈
import { useDropzone } from 'react-dropzone';
import { GET_FILES } from '../App';

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const FileUpload = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: GET_FILES }],
  });
  const onDrop = useCallback(
    async ([file]) => {
      await uploadFile({ variables: { file } });
    },
    [uploadFile],
  );
  // 타입이 프로미스다.
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    // <div {...this.state}></div>
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>여기에 파일을 드래그 앤 드롭하세요.</p> : <p>파일을 선택하세요.</p>}
    </div>
  );
};
