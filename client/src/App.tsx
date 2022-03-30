import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AddStock from './components/AddStock';
import ShowStocks from './components/ShowStocks';
import MarketHours from './components/MarketHours';
import MarketSchedule from './components/MarketSchedule';
import DepositCash from './components/DepositCash';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
export const URL_PREFIX = 'http://localhost:5000/api';

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="logo" />
          {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu> */}
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu key="sub1" title="User Actions">
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Portfolio</Menu.Item>
                <Menu.Item key="3">Transactions</Menu.Item>
                <Menu.Item key="4">Wallet</Menu.Item>
              </Menu>
              <SubMenu key="sub2" title="Admin Actions">
                <Menu.Item key="5">Add New Stock</Menu.Item>
                <Menu.Item key="6">Market Hours</Menu.Item>
                <Menu.Item key="7">Market Schedule</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                marginTop: 20,
                minHeight: 280,
              }}
            >
              {/* <AddStock /> */}
              <ShowStocks/>
              {/* <MarketHours/> */}
              {/* <MarketSchedule/> */}
              {/* <DepositCash/> */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
