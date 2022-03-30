import { Button, Descriptions, Input, message, Modal } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { URL_PREFIX } from '../../App';
import { Stock } from '../ShowStocks';

interface ModalProps {
  showModal: boolean;
  setShowStockModal: any;
  stock: Stock | undefined;
}

const ShowStockModal = (props: ModalProps) => {
  const [buyStock, setBuyStock] = useState<boolean>(false);
  const [sellStock, setSellStock] = useState<boolean>(false);
  const [buyAmt, setBuyAmt] = useState<Number>();
  const [sellAmt, setSellAmt] = useState<Number>();

  const handleBuy = () => {
    // console.log(buyAmt);
    axios.post(`${URL_PREFIX}/stocks/buy`, {
      email: 'user1@gmail.com',
      symbol: props.stock?.symbol,
      amount: buyAmt,
    }).then(res => {
      console.log(res);
      message.success('Success!');
    }).catch(err => {
      console.log(err);
      message.error("Failed!");
    });
    setBuyAmt(Number(''));
    setBuyStock(false);
  }

  const handleSell = () => {
    // console.log(sellAmt);
    axios.post(`${URL_PREFIX}/stocks/sell`, {
      email: 'user1@gmail.com',
      symbol: props.stock?.symbol,
      shares: sellAmt,
    }).then(res => {
      console.log(res);
      message.success('Success!');
    }).catch(err => {
      console.log(err);
      message.error("Failed!");
    });
    setBuyAmt(Number(''));
    setBuyStock(false);
  }
  
  return (
    <>
      <Modal
        title={props.stock?.symbol}
        visible={props.showModal}
        onCancel={() => props.setShowStockModal(false)}
      >
        <Descriptions title={`Details for ${props.stock?.symbol}`} bordered>
          <Descriptions.Item label='Price'>
            {props.stock?.price}
          </Descriptions.Item>
          <br/><br/>
          <Descriptions.Item label='Volume'>
            {props.stock?.volume}
          </Descriptions.Item>
          <br/><br/>
          <Descriptions.Item label='Market Capitalization'>
            {props.stock?.marketCap}
          </Descriptions.Item>
          {/* <br/><br/> */}
          {/* <Descriptions.Item label=''>
            <Button>Buy</Button>
          </Descriptions.Item>
          <br/><br/>
          <Descriptions.Item label=''>
            <Button>Sell</Button>
          </Descriptions.Item> */}
        </Descriptions>
        <br/>
        <Button type='primary' onClick={() => setBuyStock(true)}>Buy</Button>{'  '}
        {buyStock ? 
        <>
          <Input placeholder='Amount' style={{ width: '30%' }} onChange={(e) => setBuyAmt(Number(e.target.value))}/>{'  '}
          <Button type='primary' onClick={handleBuy}>Confirm</Button>{'  '}
          <Button danger onClick={() => setBuyStock(false)}>Cancel</Button>
        </>
        : null
        }
        <br/><br/>
        <Button type='primary' onClick={() => setSellStock(true)}>Sell</Button>{'  '}
        {sellStock ? 
        <>
          <Input placeholder='No. of shares' style={{ width: '30%' }} onChange={(e) => setSellAmt(Number(e.target.value))}/>{'  '}
          <Button type='primary' onClick={handleSell}>Confirm</Button>{'  '}
          <Button danger onClick={() => setSellStock(false)}>Cancel</Button>
        </>
        : null
        }
      </Modal>
    </>
  );
};

export default ShowStockModal;