import { Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL_PREFIX } from '../../App';

const { Title } = Typography;

interface Stock {
  key: String;
  symbol: String;
  price: Number;
  volume: Number;
  marketCap: Number;
}

const ShowStocks = () => {

  const [stockData, setStockData] = useState<Stock[] | undefined>(undefined);
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
      title: 'Market Capitalization',
      dataIndex: 'marketCap',
      key: 'marketCap',
    },
  ];

  useEffect(() => {
    if(stockData === undefined) {
      axios.get(`${URL_PREFIX}/stocks/get-stocks`)
          .then(res => {
            // console.log(res.data);
            setStockData(res.data.stocks);
          });
    }
  })

  return (
    <>
      <Title style={{textAlign:'left'}}>Stocks</Title>
      <Table columns={columns} dataSource={stockData} pagination={false} style={{ width:'50%' }}/>
    </>
  );
};

export default ShowStocks;