import React, { useState } from 'react';
import { Radio,Form } from 'antd';
const RadioButton = (props) => {
    const {options,name,label,rules,className,onChange,style} = props;
  return (
    <>
    <Form.Item
    name={name}
    label={label}
    rules={rules}
    style={style}
  >
    <Radio.Group>
   { options && Array.isArray(options) && options?.length > 0 &&  options?.map((data,index)=>(
        <Radio onChange={onChange}className={className} value={data?.value}>{data?.name}</Radio>
     ))}
    </Radio.Group>
  </Form.Item>
  </>
  );
};
export default RadioButton;