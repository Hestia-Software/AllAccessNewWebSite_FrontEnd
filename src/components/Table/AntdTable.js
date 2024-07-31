import React, { useState } from 'react';
import { Button, Table } from 'antd';

// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i+"jhhjhjhj",
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }
const Tables = ({columns,communityList,pagination,data,hasSelected,rowSelection}) => {
console.log(rowSelection,"rowSelectionrowSelectionrowSelectionrowSelection")
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? communityList : ''}
        </span>
      </div>
      <Table bordered  rowClassName={() => 'custom-row-height'} pagination={pagination} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
export default Tables;