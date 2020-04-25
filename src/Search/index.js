import { Form, Input, Button, Table } from 'antd';
import React, { useState } from 'react';

import { searchClimateStations } from '../api';

import styles from './styles.module.css';

const { Item, useForm } = Form;

function Search() {
  // TODO: look more into using `useForm`.
  // const form = useForm();
  const [results, setResults] = useState([]);
  const columns = [
    {
      title: 'Station Name',
      dataIndex: 'stationName',
      key: 'stationName',
    },
  ];
  const dataSource = results.map(
    ({ id, properties: { STATION_NAME: stationName } }) => ({
      id,
      stationName,
    }),
  );

  const onSubmit = async ({ stationName }) => {
    const { features = [] } = await searchClimateStations(stationName);
    setResults(features);
  };

  return (
    <Form className={styles.search} name="searchForm" onFinish={onSubmit}>
      <Item name="stationName">
        <Input />
      </Item>
      <Item>
        <Button htmlType="submit" title="Search" type="primary">
          Search
        </Button>
      </Item>
      {results.length > 0 && (
        <Table columns={columns} dataSource={dataSource} />
      )}
    </Form>
  );
}

export default Search;
