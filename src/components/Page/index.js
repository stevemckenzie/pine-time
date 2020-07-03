import PropTypes from 'prop-types';
import React from 'react';

import Link from '../Link';

import styles from './styles.module.scss';

const Page = ({ children, header }) => (
  <div className={styles.page}>
    <div className={styles.header}>
      <Link className={styles.logo} to="/">
        <h1>Pine Time</h1>
      </Link>
      {header}
    </div>
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

Page.propTypes = {
  header: PropTypes.node,
};

export default Page;
