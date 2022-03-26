import { Table, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const ShowStocks = () => {

  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'Market Cap.',
      dataIndex: 'marketCap',
      key: 'marketCap',
    },
  ];

  const data = [
    {
      key: '1',
      symbol: 'AMZN',
      price: 3101.54,
      volume: 103426,
      marketCap: 123456789
    },
    {
      key: '2',
      symbol: 'TSLA',
      price: 3101.54,
      volume: 103426,
      marketCap: 123456789
    },
    {
      key: '3',
      symbol: 'GOOGL',
      price: 3101.54,
      volume: 103426,
      marketCap: 123456789
    },
  ]

  return (
    <>
      <Title style={{textAlign:'left'}}>Stocks</Title>
      <Table columns={columns} dataSource={data}/>
    </>
  );
};

export default ShowStocks;