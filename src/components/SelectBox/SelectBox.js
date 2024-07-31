import React, { memo } from 'react';
import { Form, Select, Tag } from 'antd';

const { Option } = Select;

const tagRender = (props) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color="#fb923c"
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginInlineEnd: 4,
      }}
    >
      {label}
    </Tag>
  );
};
const SelectBox = (props) => {
  const {style, handleDropdownVisibleChange,filterOption,Value,showSearch,maxCount,onChange,onSearch,isLoading,size,name,label,rules,mode,placeholder,options,className} = props;
  const handleValue = (value)=>{
    const obj = {
    target:{
      id:name,
      value:value
    }
  }
onChange(obj)
  }

  return (
    <>
      <Form.Item style={style} name={name}  value={Value} label={label} rules={rules}>
      <Select  onDropdownVisibleChange={handleDropdownVisibleChange} onChange={(e)=>handleValue(e)} showSearch={showSearch} maxCount={maxCount} className={className} tagRender={tagRender} mode={mode} size={size} placeholder={placeholder}  onSearch={onSearch}
    filterOption={filterOption} notFoundContent={isLoading}>
        {options &&
          Array.isArray(options) &&
          options.length > 0 &&
          options.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.name}
            </Option>
          ))}
      </Select>
    </Form.Item>
    </>
  );
};

export default SelectBox;
