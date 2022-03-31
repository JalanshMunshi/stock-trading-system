import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import axios from 'axios';
import { URL_PREFIX } from '../../App';

const { Title } = Typography;

interface Transaction {
  key: String;
  symbol: String;
  transactionType: String;
  price: Number;
  shares: Number;
}

const Transactions = () => {
  const [transactionData, setTransactionData] = useState<Transaction[] | undefined>(undefined);
  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Shares',
      dataIndex: 'shares',
      key: 'shares',
    },
  ];
  useEffect(() => {
    if(transactionData === undefined) {
      axios.get(`${URL_PREFIX}/transactions/history/user1@gmail.com`)
          .then(res => {
            setTransactionData(res.data.transactions);
          });
    }
  })
  return (
    <>
      <Title style={{textAlign:'left'}}>Transaction history</Title>
      <Table
        columns={columns}
        dataSource={transactionData}
        style={{ width:'50%' }}
      />
    </>
  );
};

export default Transactions;