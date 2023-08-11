import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination, Table, Input } from 'antd'; // Import the Table and Input components from antd
import authservice from '../service/authservice';
import MainHeader from '../MainHeader';
import Sidepannel from '../sidepannel';

const { Search } = Input; // Destructure the Search component from Input

function PaginationSearch() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState('');
  const [page, setPages] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

  useEffect(() => {
    samplePage();
  }, [page, postPerPage]);

  const samplePage = () => {
    authservice
      .PaginationPerpage(page, postPerPage)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setPosts(response.data);
          setTotal(response.data.length);
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        console.log('error');
      });
  };

  const indexOfLastPage = page * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;

  const filteredPosts = posts.filter((post) => {
    return post.spid.toString().includes(searchTerm) || post.slastupdatedate.includes(searchTerm);
  });

  const currentPosts = filteredPosts.slice(indexOfFirstPage, indexOfLastPage);

  const onShowSizeChange = (current, pageSize) => {
    // Convert pageSize to number if it's not 'all'
    const parsedPageSize = pageSize === 'all' ? filteredPosts.length : parseInt(pageSize, 10);
    setPostPerPage(parsedPageSize);
    setTotal(filteredPosts.length);
    setPages(1);
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'spid',
      key: 'spid',
      render: (text, record, index) => <span>{index + 1}</span>, // Add S.No with index + 1
    },
    {
      title: 'Sp.Id',
      dataIndex: 'spid',
      key: 'spid',
    },
    // {
    //   title: 'Pm Status',
    //   dataIndex: 'pmclose',
    //   key: 'pmclose',
    // },
    // {
    //   title: 'Spisin',
    //   dataIndex: 'spisin',
    //   key: 'spisin',
    // },
    // {
    //   title: 'Pdtime',
    //   dataIndex: 'pdtimestamp',
    //   key: 'pdtimestamp',
    // },
    {
      title: 'Last Update Date',
      dataIndex: 'slastupdatedate',
      key: 'slastupdatedate',
    },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    setPages(1);
  };

  return (
    <div>
            <MainHeader />
      <Sidepannel />
      <div className="page-wrapper">
      {/* Search Bar */}
      <Search
        placeholder="Search posts"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={handleSearch}
        style={{ width: 200 }}
      />

      {/* Render the data in a table */}
      <Table dataSource={currentPosts} columns={columns} pagination={false} />

      {/* Pagination */}
      <Pagination
        onChange={(value) => setPages(value)}
        pageSize={postPerPage}
        total={total}
        current={page}
        showSizeChanger
        showQuickJumper
        showLessItems={false} // Display "Jump to" for all pages
        onShowSizeChange={onShowSizeChange}
        pageSizeOptions={['10', '20', '50', '100', '200', '500', '1000']} // Add 'all' option
      />
      </div>
    </div>
  );
}

export default PaginationSearch;
