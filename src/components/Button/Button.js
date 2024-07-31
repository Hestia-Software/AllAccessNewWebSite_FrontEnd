import React from "react";
import { Button,Form } from "antd";
const ButtonComponent = (props) => {
  const { title, type,disabled, shape, icon,size,htmlType,wrapperCol,className,onClick } = props;
  return (
    <>
     <Form.Item
      wrapperCol={wrapperCol}
    >
      <Button
        shape={shape}
        icon={icon}
        className={className}
        type={type}
        size={size}
        htmlType={htmlType}
        onClick={onClick}
        disabled={disabled}
      >
        {title}
      </Button>
      </Form.Item>
    </>
  );
};
export default ButtonComponent;
