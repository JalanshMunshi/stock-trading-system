import React from 'react';
import { Form, Input, Button, Typography, message, Checkbox } from 'antd';

const { Title } = Typography;

const MarketSchedule = () => {
  const [form] = Form.useForm();

  const changeSchedule = (formData: any) => {
    console.log(formData)
  }
  
  return (
    <>
      <Title style={{textAlign:'left'}}>Change Market Schedule</Title>
      <Form
        name="change-market-schedule"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={changeSchedule}
        form={form}
      >
        <Form.Item name="Monday" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox >Monday</Checkbox>
        </Form.Item>
        <Form.Item name="Tuesday" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked>Tuesday</Checkbox>
        </Form.Item>
        <Form.Item name="Wednesday" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked>Wednesday</Checkbox>
        </Form.Item>
        <Form.Item name="Thursday" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked>Thursday</Checkbox>
        </Form.Item>
        <Form.Item name="Friday" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked>Friday</Checkbox>
        </Form.Item>
        <Form.Item name="Saturday" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox>Saturday</Checkbox>
        </Form.Item>
        <Form.Item name="Sunday" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox>Sunday</Checkbox>
        </Form.Item>
        <Form.Item 
          wrapperCol={{ offset: 8, span: 16 }}
          style={{width:'10%'}}
        >
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default MarketSchedule;