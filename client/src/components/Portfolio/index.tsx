import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import axios from 'axios';
import { URL_PREFIX } from '../../App';

const { Title, Paragraph } = Typography;

interface Portfolio {
  key: String;
  symbol: String;
  shares: Number;
}

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState<Portfolio[] | undefined>(undefined);
  const [walletBalance, setWalletBalance] = useState<Number>();
  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Shares',
      dataIndex: 'shares',
      key: 'shares',
    },
  ];
  useEffect(() => {
    if(portfolioData === undefined) {
      axios.get(`${URL_PREFIX}/portfolios/view/user1@gmail.com`)
          .then(res => {
            setPortfolioData(res.data.portfolio);
            setWalletBalance(res.data.cashBalance);
          });
    }
  })
  return (
    <>
      <Title style={{textAlign:'left'}}>Portfolio</Title>
      <Paragraph style={{textAlign:'left'}}><b>Wallet Balance: </b>{walletBalance}</Paragraph>
      <Table
        columns={columns}
        dataSource={portfolioData}
        style={{ width:'30%' }}
        pagination={false}
      />
    </>
  );
};

export default Portfolio;