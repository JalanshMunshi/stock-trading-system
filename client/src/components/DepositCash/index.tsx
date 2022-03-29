import React from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import axios from 'axios';
import { URL_PREFIX } from '../../App';

const { Title } = Typography;

const DepositCash = () => {
  const [form] = Form.useForm();

  const addCash = (formData:any) => {
    console.log(formData);
    axios.post(`${URL_PREFIX}/users/deposit-cash`, {
      email: 'user1@gmail.com',
      cash: formData.cash,
    }).then(res => {
      console.log(res);
      message.success('Cash deposited successfully!');
    }).catch(err => {
      console.log(err);
      message.error('Error adding cash to wallet.');
    })
  }
  
  return (
    <>
      <Title style={{textAlign:'left'}}>Deposit Cash</Title>
      <Form
        name="add-cash"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={addCash}
        form={form}
      >
        <Form.Item
          label="Add money to your wallet"
          name="cash"
          rules={[{ required: true, message: 'Please enter the amount.' }]}
          style={{width:'50%'}}
        >
          <Input placeholder='1000' style={{ width:'30%' }}/>
        </Form.Item>
        <Form.Item 
          wrapperCol={{ offset: 8, span: 16 }}
          style={{width:'30%'}}
        >
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DepositCash;