import React, { useState } from 'react';
import { Checkbox, Form } from 'antd';

const CheckBoxButton = (props) => {
    const { options,name, label, disabled,checkedValues, wrapperCol,onChange } = props;
    return (
        <Form.Item name={name}  >
            <label>{label}</label>
            <Checkbox.Group
                options={options}
                value={checkedValues}
                onChange={onChange}
                disabled={disabled}  
            />
        </Form.Item>
    );
};

export default CheckBoxButton;
