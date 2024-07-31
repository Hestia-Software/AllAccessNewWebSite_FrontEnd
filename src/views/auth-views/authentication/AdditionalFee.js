import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "antd";
import Component from "../../../components";
import Validation from "../../../utils/Validation";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner/Spiner";
import AdditionalFeeAction from "../../../redux/actions/AuthAction/AdditionalFeeAction";

const AdditionalFee = () => {
  const dispatch = useDispatch();
  const { SelectBox, TextInput } = Component;
  const [form] = Form.useForm();

  const data = useSelector((state) => state?.AdditionalFee);
  console.log(data);
  const additionalFeeRes = useSelector((state) => state?.CreateAdditionalFee);
  let optionsArrray = [];
  let propertiesList = data?.additionalFee?.item2;
  
  Array.isArray(propertiesList) &&
    propertiesList.length > 0 &&
    propertiesList.map((op) =>
      optionsArrray.push({ name: op?.communityName, value: op?.communityId })
    );

  const validationRules = Validation.getValidation(["state"]);

  const onFinish = async (values) => {
    debugger;
    try {
      let req = {
        propertyId: values?.propertyId,
        fee: values?.fee,
      };
      if (req) {
        dispatch(AdditionalFeeAction.CreateAdditionalFeeRequest(req));
      }

      form.resetFields();
    } catch (error) {
      Swal.fire({
        text: "Additional Fee could not be added.",
        icon: "error",
        confirmButtonColor: "#5A7890",
        customClass: {
          title: "text-danger",
          content: "text-danger",
        },
      });
    }
  };
  function HandleOnChange(selected) {
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(AdditionalFeeAction.AdditionalFeeRequest());
  }, []);

  return (
    <>
      {(data?.loading || additionalFeeRes?.loading) && <Spinner />}
      <Row justify={"center"}>
        <Col sm={20} className="text-center">
          <div className="text-center mt-5">
            <h2 style={{ color: "#5A7890", marginBottom: "3rem" }}>
              Additional Fee
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
            <SelectBox
              label="Select Property"
              name="propertyId"
              options={optionsArrray}
              className="custom-scrollbar"
              placeholder="Select Property"
              onChange={(e) => HandleOnChange(e)}
              size="large"
              rules={validationRules.state}
              style={{ marginBottom: "2rem" }}
            />

            <TextInput
              rules={validationRules.state}
              name="fee"
              size="large"
              label="Additional Fee"
              placeholder="Enter Additional Fee"
              onChange={(e) => HandleOnChange(e)}
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
    </>
  );
};
export default AdditionalFee;
