import React from 'react';
import { Spin, Alert } from 'antd';


const Spinner = () => (
  <div className="spinner-overlay">
    <div className="spinner-container">
      <Spin  wrapperClassName="sffsdfs" size="large">
        <Alert  message="Please wait..." type="info" />
      </Spin>
    </div>
  </div>
);

export default Spinner;