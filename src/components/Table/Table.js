import React from 'react';
import { Table } from 'antd';

const calculateColumnWidth = (text, padding = 16) => {
  // Assuming an average character width of 8px and adding padding for table cell
  return text.length * 8 + padding;
};

const generateColumnsWithWidth = (columns, data) => {
  return columns.map((column) => {
    const longestValue = data.reduce((max, row) => {
      const value = row[column.dataIndex];
      return value && value.length > max.length ? value : max;
    }, column.title);

    const width = calculateColumnWidth(longestValue);
    return { ...column, width, className: 'custom-column-class' }; // Add className here
  });
};

const DynamicTable = ({ columns, data }) => {
  const columnsWithWidth = generateColumnsWithWidth(columns, data);
  return (
    <Table 
      columns={columnsWithWidth}
      dataSource={data}
      pagination
      rowKey="id"
      bordered
    />
  );
};

export default DynamicTable;
