import { Button, Descriptions, Modal } from 'antd';
import React from 'react';
import { Stock } from '../ShowStocks';

interface ModalProps {
  showModal:boolean;
  setShowStockModal: any;
  stock: Stock | undefined;
}

const ShowStockModal = (props: ModalProps) => {
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
          <br/><br/>
          <Descriptions.Item label=''>
            <Button>Buy</Button>
          </Descriptions.Item>
          <br/><br/>
          <Descriptions.Item label=''>
            <Button>Sell</Button>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default ShowStockModal;