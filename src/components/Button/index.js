import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../LoadingIndicator';

import styles from './styles.module.scss';

const Button = ({
  children,
  className,
  disabled,
  kind,
  loading = false,
  title,
  ...props
}) => (
  <button
    className={classnames(styles.button, {
      [styles[kind]]: !!kind,
      [styles.loading]: loading,
      [className]: !!className,
    })}
    disabled={disabled || loading}
    title={title}
    {...props}
  >
    {loading && <LoadingIndicator className={styles.loadingIndicator} />}
    <span>{children || title}</span>
  </button>
);

Button.propTypes = {
  kind: PropTypes.oneOf(['primary', 'secondary']),
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Button;
