import PropTypes from 'prop-types';
import React from 'react';

const Table = ({ headers, rows }) => (
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
          {columns.map((column, i) =>
            typeof column === 'object' ? (
              column
            ) : (
              <td key={headers[i]}>{column}</td>
            ),
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  headers: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
};

export default Table;
