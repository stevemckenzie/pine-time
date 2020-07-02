import classnames from 'classnames';
import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

import styles from './styles.module.scss';

const LoadingIndicator = ({ className, loading = true }) => (
  <div className={classnames(styles.loadingIndicator, className)}>
    <ClipLoader loading={loading} />
  </div>
);

export default LoadingIndicator;
