import React from 'react';
import { Modal } from 'antd';
const ModalComponent = (props) => {
    const {title ,centered,footer, open, Ok, Cancel, width, children,pageName} = props;
  return (
    <>

      <Modal
        title={title}
        centered={centered}
        open={open}
        onOk={() => Ok(false)}
        onCancel={() => Cancel()}
        width={width}
        footer={footer}
        className='mt-5 common-button custom-modal-height'
      >
        {children(pageName)}
      </Modal>
    </>
  );
};
export default ModalComponent;