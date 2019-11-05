import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ children, title, ...props }) => (
  <RouterLink title={title} {...props}>
    <span>{children || title}</span>
  </RouterLink>
);

export default Link;
