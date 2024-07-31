import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "antd";
import Component from "../../../components";
import Validation from "../../../utils/Validation";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner/Spiner";
import DisclaimerAction from "../../../redux/actions/AuthAction/DisclaimerAction";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Disclaimer = () => {
  const dispatch = useDispatch();
  const { SelectBox, Radio } = Component;
  const [form] = Form.useForm();
  const [disclaimerFor, setDisclaimerFor] = useState([]);
  const [placeholder, setPlaceholder] = useState("Select");
  const [editorContent, setEditorContent] = useState("");

  const data = useSelector((state) => state?.Disclaimer);
  const disclaimerRes = useSelector((state) => state?.CreateDisclaimer);
  let optionsArrray = [];
  let statesList = data?.disclaimer?.item1;
  Array.isArray(statesList) && statesList.length > 0 && statesList.map(op => optionsArrray.push({ name: op?.stateName, value: op?.stateId }))
  statesList = optionsArrray;
  optionsArrray = [];
  let propertiesList = data?.disclaimer?.item2;
  Array.isArray(propertiesList) && propertiesList.length > 0 && propertiesList.map(op => optionsArrray.push({ name: op?.communityName, value: op?.communityId }))
  propertiesList = optionsArrray;

  const validationRules = Validation.getValidation([
    "editorContent",
    "radio",
    "state",
  ]);
  const disclaimerOptions = [
    {
      value: "State",
      name: "State",
    },
    {
      value: "Property",
      name: "Property",
    },
  ];

  function HandleOnChange(selected) {
    debugger;
    if (selected.target.value == "State") {
      setDisclaimerFor(statesList);
      setPlaceholder("Select State");
      form.resetFields(['id']);
    }
    if (selected.target.value == "Property") {
      setDisclaimerFor(propertiesList);
      setPlaceholder("Select Property");
      form.resetFields(['id']);
    }
  }
  const onFinish = async (values) => {
    debugger;
    try {
      let req = {
        type : values?.type,
        id : values?.id,
        disclaimer : editorContent
      };
      if (req) {
        dispatch(DisclaimerAction.CreateDisclaimerRequest(req));
      }

      form.resetFields();
      setEditorContent('');
    } catch (error) {
      Swal.fire({
        text: "Disclaimer could not be added.",
        icon: "error",
        confirmButtonColor: "#5A7890",
        customClass: {
          title: "text-danger",
          content: "text-danger",
        },
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(()=>{
    dispatch(DisclaimerAction.DisclaimerRequest())
  },[])

  const handleCKEditorChange = (event, editor) => {
    debugger;
    const data = editor.getData();
    setEditorContent(data); // Update editor content state

    const selection = editor.model.document.selection;
    if (selection.isCollapsed) {
      return; // Do nothing if no text is selected
    }

    //HandleOnChange(data); // Handle rich text data
  };

  return (
    <>
      {(data?.loading || disclaimerRes?.loading) && <Spinner />}
      <Row justify={"center"}>
        <Col sm={20} className="text-center">
          <div className="text-center mt-5">
            <h2 style={{ color: "#5A7890", marginBottom: "3rem" }}>
              Disclaimer
            </h2>
          </div>
        </Col>
        <Col sm={20}>
          <Form
            style={{ marginBottom: "12rem" }}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Radio
              label = "Choose the option for which you want to add the disclaimer."
              name="type"
              options={disclaimerOptions}
              onChange={(e) => HandleOnChange(e)}
              rules={validationRules.radio}
              style={{marginBottom:"2rem"}}
            />
            {form.getFieldValue("type") && (
              <SelectBox
                label = {placeholder}
                name="id"
                options={disclaimerFor}
                className="custom-scrollbar"
                placeholder={placeholder}
                onChange={(e) => HandleOnChange(e)}
                size="large"
                rules={validationRules.state}
                style={{marginBottom:"2rem"}}
              />
            )}

            <CKEditor
              editor={ClassicEditor}
              data={editorContent}
              onChange={handleCKEditorChange}
              className="custom-ckeditor"
              rules={validationRules.editorContent}
              name="disclaimer"
              height= "400px" // Adjust the height as needed
              
            />
            <Button
              htmlType="submit"
              class="submit-button"
              style={{
                marginTop: 20,
                marginLeft: 8,
                borderRadius: 19,
                color: "white",
                backgroundColor: "#5A7890",
                height: "2.5rem",
                width: "5rem",
              }}
            >
              Add
            </Button>
          </Form>
        </Col>
      </Row>
      {/* <Col sm={1}>
        <div className="mt-5">
          <Button
            onClick={handleOpenModal}
            htmlType="submit"
            class="submit-button"
            style={{
              marginLeft: 8,
              borderRadius: 19,
              color: "white",
              backgroundColor: "#5A7890",
              height: "2.5rem",
              width: "8rem",
            }}
          >
            Add Disclaimer
          </Button>
          <ModalComponent
            title="Add Disclaimer"
            centered
            open={isModalOpen}
            Ok={handleOk}
            Cancel={handleCancel}
            width={600}
            pageName="ExamplePage"
          >
            {(pageName) => (
              <>
                <Form
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  initialValues={{}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  form={form}
                >
                  <Col sm={20}>
                    <Radio
                      name="radio"
                      options={disclaimerOptions}
                      onChange={(e) => HandleOnChange(e)}
                      rules={validationRules.radio}
                    />
                  </Col>
                  <SelectBox
                    name="select"
                    options={disclaimerFor}
                    className="custom-scrollbar"
                    placeholder={placeholder}
                    onChange={(e) => HandleOnChange(e)}
                    size="large"
                    rules={validationRules.select}
                  />
                  <Form.Item
                    label="Disclaimer"
                    name="editorContent"
                    rules={[
                      { required: true, message: "Disclaimer is required" },
                    ]}
                  >
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorContent}
                      onChange={handleCKEditorChange}
                      className="custom-ckeditor"
                      rules={validationRules.editorContent}
                    />
                  </Form.Item>
                </Form>
              </>
            )}
          </ModalComponent>
        </div>
      </Col> */}
    </>
  );
};
export default Disclaimer;
