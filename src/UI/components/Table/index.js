import PropTypes from 'prop-types';
import React from 'react';

const Table = ({ children, headers, rows }) => (
  <table>
    <thead>
      <tr>
        {headers.map((header) =>
          typeof header === 'string' ? (
            <th key={header} title={header}>
              {header}
            </th>
          ) : (
            header
          ),
        )}
      </tr>
    </thead>
    <tbody>
      {rows.map((columns, index) => (
        <tr key={index}>
          {columns.map((column) =>
            typeof column === 'object' ? column : <td>{column}</td>,
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  headers: PropTypes.oneOfType([PropTypes.string, 'th']),
  rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, 'th'])),
};

export default Table;
