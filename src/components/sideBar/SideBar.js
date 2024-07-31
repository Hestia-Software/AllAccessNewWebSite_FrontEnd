import React from 'react';
import { Drawer } from 'antd';
const SideBar = (props) => {
    const {close,closable,width,footer, destroyOnClose,mask, title, placement, open, loading, onClose,children} = props;

  return (
    <>
      <Drawer
        closable={closable}
        destroyOnClose={destroyOnClose}
        title={title}
        placement={placement}
        open={open}
        loading={loading}
        onClose={() => onClose()}
        width={width}
        mask={mask}
        footer={footer}
        maskClosable={close}
      >
       {children()}
      </Drawer>
    </>
  );
};
export default SideBar;