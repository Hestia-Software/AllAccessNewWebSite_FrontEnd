import React from 'react';
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    QuestionCircleOutlined,
    UserDeleteOutlined,
    CheckOutlined,
  } from "@ant-design/icons";
import {Popover,Button,Popconfirm} from 'antd'


export const renderAction = ({user,handleView,title,icon}) => {
    return (
      <>
    
         <Popover placement="topLeft" title={title} ><Button
          onClick={() => handleView(user)}
          className="edit-btn"
          shape={"circle"}
          icon={icon}
        ></Button></Popover>
           
       
 
      </>
    );
  };

  export const ConfirmationrenderAction = ({user,confirm,title,icon}) => {
    return (
      <>
      <div className="d-flex">
            <Popconfirm
          title={title}
          className="ms-1"
          description="Are you sure to delete this Form?"
          onConfirm={() => confirm(user, "delete")}
          icon={icon}
        >
           <Popover placement="topLeft" title={"Delete"} ><Button
            className="delete-btn"
            shape={"circle"}
            icon={<DeleteOutlined />}
          /></Popover>
        </Popconfirm>
       
     </div>
       
      </>
    );
  };

  