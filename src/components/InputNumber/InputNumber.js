import React from 'react';
import { InputNumber, Form } from 'antd';

const InputNumberComponent = (props) => {
    const {onChange,name, rules, size, className, status, placeholder, label, maxLength, step} = props;

    return(
        <>
        <Form.Item
      label={label}
      name={name}
      rules={rules}
    >
      <InputNumber placeholder={placeholder} maxLength={maxLength} step={step}  status={status} className={className}  size={size} onChange={onChange} />
    </Form.Item>
        </>
    )
};
export default InputNumberComponent;