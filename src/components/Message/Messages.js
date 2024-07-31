import React from 'react';
import { Result } from 'antd';
const Messages = (props) =>{ 
    const {status,title,subTitle,extra} = props;
    return(
  <Result
  className="custom-404-result" // Add custom class
    status={status}
    title={title}
    subTitle={subTitle}
    extra={extra}
  />
)};
export default Messages;