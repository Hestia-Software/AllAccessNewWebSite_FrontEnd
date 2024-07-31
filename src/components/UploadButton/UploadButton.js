import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Form } from "antd";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadButton = ({handlePreview,handleChange, number,fileList,previewOpen,previewImage,setPreviewOpen,setPreviewImage,setFileList }) => {
  const handlePreviews = async (file) => {
    handlePreview(file)
  };



  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <Form.Item name="files">
        <Upload
          listType="picture-circle"
          fileList={fileList}
          method="get"
          multiple={true}
          onPreview={handlePreviews}
          onChange={handleChange}
        >
          {fileList.length >= number ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>
    </>
  );
};
export default UploadButton;
