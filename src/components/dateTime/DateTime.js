import React from 'react';
import {
    DatePicker,
    Form
  } from 'antd';


const DateTimePicker  = (props) =>{ 
    const {label,name,rules,size,disabled} = props;
    return(
        <Form.Item
        label={label}
        name={name}
        rules={rules}
      >
        <DatePicker disabledDate={disabled} size={size} style={{
        width: '100%',
      }}/>
      </Form.Item>
    )
};

export default DateTimePicker;