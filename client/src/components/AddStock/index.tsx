import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

interface Stock {
  symbol: string,
  companyName: string,
  volume: number,
  price: number,
};

function AddStock() {

  const [form] = Form.useForm();

  const publishStock = (stock: Stock) => {
    console.log('Success:', stock);
    form.resetFields();
    message.success('Stock added successfully.');
  };

  return (
    <>
      <Title style={{textAlign:'left'}}>Add New Stock</Title>
      <Form
        name="add-new-stock"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={publishStock}
        form={form}
      >
        <Form.Item
          label="Symbol"
          name="symbol"
          rules={[{ required: true, message: 'Please enter the symbol.' }]}
          style={{width:'30%'}}
        >
          <Input placeholder='AMZN' />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: 'Please enter the company name.' }]}
          style={{width:'30%'}}
        >
          <Input placeholder='Amazon' />
        </Form.Item>
        <Form.Item
          label="Volume"
          name="volume"
          rules={[{ required: true, message: 'Please enter the total shares.' }]}
          style={{width:'30%'}}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item
          label="Initial Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the initial price.' }]}
          style={{width:'30%'}}
        >
          <Input type='number' />
        </Form.Item>
        <Form.Item 
          wrapperCol={{ offset: 8, span: 16 }}
          style={{width:'30%'}}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddStock;