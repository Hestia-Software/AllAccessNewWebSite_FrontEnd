import React from "react";
import { Form,Input } from 'antd';
import TextArea from "antd/es/input/TextArea";

const TextInput = (props) => {
  const { label,value, name, rows, icon,size,className,placeholder,rules,password,hasFeedback,validateTrigger,onChange} = props;

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
        {<TextArea  rows={rows} onChange={(e) =>onChange && onChange(e)}  size={size} placeholder={placeholder} prefix={icon} /> } 
    </Form.Item>
     
    </>
  );
};
export default TextInput;
