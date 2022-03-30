import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AddStock from './components/AddStock';
import ShowStocks from './components/ShowStocks';
import MarketHours from './components/MarketHours';
import MarketSchedule from './components/MarketSchedule';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';
import Portfolio from './components/Portfolio';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
export const URL_PREFIX = 'http://localhost:5000/api';

enum ViewType {
  SHOW_STOCKS,
  ADD_STOCK,
  MARKET_SCHEDULE,
  MARKET_HOURS,
  PORTFOLIO,
  TRANSACTIONS,
  WALLET
};

function App() {
  const [view, setView] = useState<ViewType>(ViewType.SHOW_STOCKS);
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <div className="logo" />
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
                <Menu.Item key="1" onClick={() => {setView(ViewType.SHOW_STOCKS)}}>
                  Stocks
                </Menu.Item>
                <Menu.Item key="2" onClick={() => {setView(ViewType.PORTFOLIO)}}>
                  Portfolio
                </Menu.Item>
                <Menu.Item key="3" onClick={() => {setView(ViewType.TRANSACTIONS)}}>
                  Transactions
                </Menu.Item>
                <Menu.Item key="4" onClick={() => {setView(ViewType.WALLET)}}>
                  Wallet
                </Menu.Item>
              </Menu>
              <SubMenu key="sub2" title="Admin Actions">
                <Menu.Item key="5" onClick={() => {setView(ViewType.ADD_STOCK)}}>
                  Add New Stock
                </Menu.Item>
                <Menu.Item key="6" onClick={() => {setView(ViewType.MARKET_HOURS)}}>
                  Market Hours
                </Menu.Item>
                <Menu.Item key="7" onClick={() => {setView(ViewType.MARKET_SCHEDULE)}}>
                  Market Schedule
                </Menu.Item>
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
              {/* https://stackoverflow.com/questions/8597731/are-there-known-techniques-to-generate-realistic-looking-fake-stock-data */}
              {
                view === ViewType.ADD_STOCK ? <AddStock/>
                : view === ViewType.SHOW_STOCKS ? <ShowStocks/>
                : view === ViewType.MARKET_HOURS ? <MarketHours/>
                : view === ViewType.MARKET_SCHEDULE ? <MarketSchedule/>
                : view === ViewType.WALLET ? <Wallet/>
                : view === ViewType.TRANSACTIONS ? <Transactions/>
                : view === ViewType.PORTFOLIO ? <Portfolio/>
                : <></>
              }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
