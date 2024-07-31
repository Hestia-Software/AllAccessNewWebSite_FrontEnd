import React from 'react';
import { Popconfirm } from 'antd';

const ConfirmationPop = ({cancelText,okText,children,title,description,onConfirm,onCancel}) => (
  <Popconfirm
  title={title} 
  description={description}
  onConfirm={onConfirm}
  onCancel={onCancel}
  okText={okText}
  cancelText={cancelText}
  >
   {children}
  </Popconfirm>
);
export default ConfirmationPop;