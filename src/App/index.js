import { Drawer, Button, Layout } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';

import Search from '../Search';

import styles from './styles.module.css';

const { Content, Header } = Layout;

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const onShowSearch = () => setShowSearch(true);
  const onHideSearch = () => setShowSearch(false);

  return (
    <Layout>
      <Header>
        <Button onClick={onShowSearch} type="link">
          +
        </Button>
      </Header>
      <Content>content...</Content>
      <div className={styles.app}>
      </div>
      <Drawer
        onClose={onHideSearch}
        placement="right"
        title="Search"
        visible={showSearch}
      >
        <Search />
      </Drawer>
    </Layout>
  );
}

export default App;
