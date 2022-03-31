import { Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL_PREFIX } from '../../App';
import ShowStockModal from '../ShowStockModal';

const { Title } = Typography;

export interface Stock {
  key: String;
  symbol: String;
  price: Number;
  volume: Number;
  marketCap: Number;
  openingPrice: Number;
  high: Number;
  low: Number;
}

const ShowStocks = () => {

  const [stockData, setStockData] = useState<Stock[] | undefined>(undefined);
  const [showStockModal, setShowStockModal] = useState<boolean>(false);
  const [modalStock, setModalStock] = useState<Stock>();
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
    // if(stockData === undefined) {
      // Call the stock API every 2 seconds. 
      const interval = setInterval(() => {
        axios.get(`${URL_PREFIX}/stocks/get-stocks`)
            .then(res => {
              // console.log(res.data);
              setStockData(res.data.stocks);
              console.log(res.data.stocks);
            });
      }, 2000);
      return () => clearInterval(interval);
    // }
  })

  return (
    <>
      <ShowStockModal 
        showModal={showStockModal}
        setShowStockModal={setShowStockModal}
        stock={modalStock}
      />
      <Title style={{textAlign:'left'}}>Stocks</Title>
      <Table
        columns={columns}
        dataSource={stockData}
        pagination={false}
        style={{ width:'50%' }}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              setModalStock(record);
              setShowStockModal(true);
            }
          }
        }}
      />
    </>
  );
};

export default ShowStocks;