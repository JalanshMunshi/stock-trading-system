import React from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import axios from 'axios';
import { URL_PREFIX } from '../../App';

const { Title } = Typography;

const Wallet = () => {
  const [depositForm] = Form.useForm();
  const [withdrawForm] = Form.useForm();

  const depositCash = (formData:any) => {
    // console.log(formData);
    axios.post(`${URL_PREFIX}/users/deposit-cash`, {
      email: 'user1@gmail.com',
      cash: formData.depositCash,
    }).then(res => {
      console.log(res);
      message.success('Cash deposited successfully!');
    }).catch(err => {
      console.log(err);
      message.error('Error adding cash to wallet.');
    });
    depositForm.resetFields();
  }

  const withdrawCash = (formData:any) => {
    // console.log(formData);
    axios.post(`${URL_PREFIX}/users/withdraw-cash`, {
      email: 'user1@gmail.com',
      cash: formData.withdrawCash,
    }).then(res => {
      console.log(res);
      message.success('Cash withdrawn successfully!');
    }).catch(err => {
      console.log(err);
      message.error('Error adding cash to wallet.');
    });
    withdrawForm.resetFields();
  }
  
  return (
    <>
      <Title style={{textAlign:'left'}}>Deposit Cash</Title>
      <Form
        name="deposit-cash"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={depositCash}
        form={depositForm}
      >
        <Form.Item
          label="Add money to your wallet"
          name="depositCash"
          rules={[{ required: true, message: 'Please enter the amount.' }]}
          style={{width:'50%'}}
        >
          <Input placeholder='1000' style={{ width:'30%' }}/>
        </Form.Item>
        <Form.Item 
          wrapperCol={{ offset: 8, span: 16 }}
          style={{width:'30%'}}
          name='deposit'
        >
          <Button type="primary" htmlType="submit">
            Deposit
          </Button>
        </Form.Item>
      </Form>

      <Title style={{textAlign:'left'}}>Withdraw Cash</Title>
      <Form
        name="withdraw-cash"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={withdrawCash}
        form={withdrawForm}
      >
        <Form.Item
          label="Withdraw money from your wallet"
          name="withdrawCash"
          rules={[{ required: true, message: 'Please enter the amount.' }]}
          style={{width:'50%'}}
        >
          <Input placeholder='1000' style={{ width:'30%' }}/>
        </Form.Item>
        <Form.Item 
          wrapperCol={{ offset: 8, span: 16 }}
          style={{width:'30%'}}
          name='withdraw'
        >
          <Button type="primary" htmlType="submit">
            Withdraw
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Wallet;