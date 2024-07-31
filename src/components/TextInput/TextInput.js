import React from "react";
import { Form,Input } from 'antd';

const TextInput = (props) => {
  const { label,value, name, icon,size,className,placeholder, rules,password,hasFeedback,validateTrigger,onChange} = props;

  return (
    <>
    <Form.Item
    hasFeedback={hasFeedback}
      label={label}
      name={name}
      rules={rules}
      validateTrigger={validateTrigger}
      className={className}
    >
        {password ? <Input.Password onChange={(e) =>onChange && onChange(e)} size={size} placeholder={placeholder} prefix={icon} /> : <Input onChange={onChange}    size={size} placeholder={placeholder} prefix={icon} />} 
    </Form.Item>
     
    </>
  );
};
export default TextInput;
