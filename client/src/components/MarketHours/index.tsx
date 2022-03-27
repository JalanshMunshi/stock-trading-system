import { Button, Form, Input, message, TimePicker, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL_PREFIX } from '../../App';
import moment from 'moment';
// import TimePicker from 'react-time-picker';

const { Title } = Typography;

const MarketHours = () => {
  const [form] = Form.useForm();
  const [startTime, setStartTime] = useState(String);
  const [endTime, setEndTime] = useState(String);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios.get(`${URL_PREFIX}/markets/get-market-hours`)
        .then((res) => {
          const start = res.data.startTime;
          const end = res.data.endTime;
          // console.log(res);
          setStartTime(start);
          setEndTime(end);
        }).catch(err => {
          message.error('Unable to fetch market hours.');
          console.log(err);
        });
    // console.log(startTime);
    // console.log(endTime);
  });

  const updateHours = (formData: any) => {
    const start = moment(formData.newStartTime, "HH:mm:ss");
    const end = moment(formData.newEndTime, "HH:mm:ss");
    axios.post(`${URL_PREFIX}/markets/admin/change-market-hours`, {
      email: 'admin@stockup.com',
      startTime: start,
      endTime: end, 
    }).then(res => {
      message.success(res.data.message);
    }).catch(err => {
      message.error('Unable to change.');
    });
    setEdit(false);
  }
  
  return (
    <>
      <Title style={{textAlign:'left'}}>Change Market Hours</Title>
      <Form
        name="change-hours"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={updateHours}
        form={form}
      >
        <Form.Item
          label="Start Time"
          name="startTime"
          style={{width:'30%'}}
        >
          <Input defaultValue={'08:00:00'} disabled />
        </Form.Item>
        <Form.Item
          label="End Time"
          name="endTime"
          style={{width:'30%'}}
        >
          <Input defaultValue={'17:00:00'} disabled />
        </Form.Item>
        {!edit ?
        null
        :
        <>
          <Form.Item
            name="newStartTime"
            label="New Start Time"
            rules={[{
              type: 'object' as const,
              required: true,
              message: 'Please select time!'
            }]}
            style={{width:'30%'}}
          >
            <TimePicker />
          </Form.Item>
          <Form.Item
            name="newEndTime"
            label="New End Time"
            rules={[{
              type: 'object' as const,
              required: true,
              message: 'Please select time!'
            }]}
            style={{width:'30%'}}
          >
            <TimePicker />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
            style={{width:'30%'}}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </>
        }
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
          style={{width:'30%'}}
        >
          <Button type="primary" htmlType="button" onClick={() => {
            setEdit(!edit);
          }}>
            {edit ? 'Cancel' : 'Edit'}
          </Button>
        </Form.Item>
        
      </Form>
    </>
  );
};

export default MarketHours;