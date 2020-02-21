import React from 'react';
import { useEffect } from 'react';
import { Table } from 'antd';
import Book from './Book';

const Books = ({ books, getBooks, error, loading, deleteBook }) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  if (error !== null) {
    return <div>에러다</div>;
  }

  return (
    <div>
      <Table
        dataSource={books === null ? [] : books.toJS()}
        columns={[
          {
            title: 'Book',
            dataIndex: 'book',
            key: 'book',
            render: (text, record) => (
              <Book {...record} deleteBook={deleteBook} key={record.bookId} />
            ),
          },
        ]}
        loading={books === null || loading}
        showHeader={false}
        pagination={{
          size: 'small',
          pageSize: 10,
          align: 'center',
        }}
        bodyStyle={{
          borderTop: '1px solid #e8e8e8',
        }}
        style={{
          marginTop: 30,
        }}
        rowKey="bookId"
      />
    </div>
  );
};

export default Books;
