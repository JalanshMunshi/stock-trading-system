import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, message, Checkbox, Select } from 'antd';
import axios from 'axios';
import { URL_PREFIX } from '../../App';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface Week {
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
}

const MarketSchedule = () => {
  const [form] = Form.useForm();
  const [schedule, setSchedule] = useState<Week | undefined>(undefined);
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  useEffect(() => {
    if(schedule === undefined) {
      axios.get(`${URL_PREFIX}/markets/get-market-schedule`)
          .then(res => {
            const data = res.data.marketSchedule;
            setSchedule(data);
          }).catch(err => {
            message.error('Unable to fetch market schedule.');
            console.log(err);
          });
    }
  })
  
  const changeSchedule = (formData: any) => {
    // console.log(formData);
    var requestData = [{}];
    days.forEach(day => {
      if(formData[day] === false || formData[day] === undefined) {
        requestData.push({
          day: day,
          running: false,
        });
      } else {
        requestData.push({
          day: day,
          running: true,
        });
      }
    });
    axios.post(`${URL_PREFIX}/markets/admin/change-market-schedule`, {
      email: 'admin@stockup.com',
      schedule: requestData,
    })
  }
  
  return (
    <>
      <Title style={{textAlign:'left'}}>Change Market Schedule</Title>
      <Paragraph style={{textAlign:'left'}}>
        Please select the new schedule by ticking the checkboxes.
      </Paragraph>
      <Form
        name="change-market-schedule"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={changeSchedule}
        form={form}
      >
        <Form.Item name="Monday" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked={schedule?.Monday}>Monday{console.log(schedule?.Monday)}</Checkbox>
        </Form.Item>
        <Form.Item name="Tuesday" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked={schedule?.Tuesday}>Tuesday</Checkbox>
        </Form.Item>
        <Form.Item name="Wednesday" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked={schedule?.Wednesday}>Wednesday</Checkbox>
        </Form.Item>
        <Form.Item name="Thursday" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked={schedule?.Thursday}>Thursday</Checkbox>
        </Form.Item>
        <Form.Item name="Friday" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked={schedule?.Friday}>Friday</Checkbox>
        </Form.Item>
        <Form.Item name="Saturday" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked={schedule?.Saturday}>Saturday</Checkbox>
        </Form.Item>
        <Form.Item name="Sunday" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }} style={{width:'10%'}}>
          <Checkbox checked={schedule?.Sunday}>Sunday</Checkbox>
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