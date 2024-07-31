import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "antd";
import Component from "../../../components";
import Utils from "../../../utils";
import Validation from "../../../utils/Validation";
import TextArea from "antd/es/input/TextArea";
import { FormLabel } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import {env} from '../../../config/EnvirementConfig'
import PrefixPath from "../../../config/AppConfig";
import { useDispatch, useSelector } from "react-redux";
import MaintenanceAction from "../../../redux/actions/AuthAction/MaintenanceAction";
import Spinner from "../../../components/Spinner/Spiner";
import ModalComponent from "../../../components/Modal/Modal";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Maintenance = () => {

  const dispatch = useDispatch();
  const { TextInput, SelectBox,UploadButton, TextArea } = Component;
  const [state, setState] = useState([]);
  const [form] = Form.useForm();
  const [maintenance, setMaintenance] = useState({});
  const [city, setCity] = useState([]);
  const [communities, setCommunities] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const data = useSelector(state=>state?.Maintenance);
  const maintenanceRes = useSelector(state => state?.CreateMaintenance)
  const states = data?.maintenance?.item1 && Object.keys(data?.maintenance?.item1)?.length > 0 && Object.entries(data?.maintenance?.item1).map(([key, value]) => key);
  let newStates = [];
  states && states.forEach((element) => {
    element = element.substring(1, element.length - 1);
    const name = element.split(",")[0].trim();
    let value = element.split(",")[1].trim();
    newStates.push({ name: name, value: value });
  });
  const citys = data?.maintenance?.item1;
  const modifiedCitys = citys && Object.entries(citys).reduce((acc, [key, value]) => {
    key = key.substring(1, key.length - 1);
    const newKey = key.split(",")[1].trim();
    acc[newKey] = value;
    return acc;
  }, {});
  const communitiesList = data?.maintenance?.item2;
  
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    debugger;
    let fileNames = [];
    let i = 0;
    newFileList.forEach((file) => {
      if (i == 0) {
        fileNames = [...fileNames, file.name];
        i = i + 1;
      }
      else {
        if (fileNames.includes(file.name)) {
          Swal.fire({
            title: "Warning",
            text: "File name already exists.(" + file.name + ")",
            icon: "warning",
            confirmButtonColor: "#44637e",
          });
          newFileList.splice(newFileList.indexOf(file), 1)
        } else {
          fileNames = [...fileNames, file.name];
        }
      }
      setFileList(fileNames);
    });
    const maxSize = 5 * 1024 * 1024 * 1024;
    let totalSize = 0;
    let filesChecked = [];
    newFileList.forEach((file) => {
      totalSize = totalSize + file?.originFileObj?.size;
      if (totalSize > maxSize) {
        Swal.fire({
          title: "Warning",
          text: "Can not upload files of size more than 5 GB.",
          icon: "warning",
          confirmButtonColor: "#44637e",
        });
        
      }
      else{
        filesChecked.push(file);
      }
    });
    setFileList(filesChecked);
  };
    const onFinish = async (values) => {
      debugger;
      try {
        const formData = new FormData();
        formData.append('state', values.state);
        formData.append('City', values.city);
        formData.append('CommunityId', values.communities);
        formData.append('userFirstName', values.firstName);
        formData.append('userLastName', values.lastName);
        formData.append('userAddress', values.address);
        formData.append('userCity', values.cityName);
        formData.append('userState', values.stateName);
        formData.append('userZip', values.zip);
        formData.append('userDayTimePhone', values.phone);
        formData.append('userEmail', values.email);
        formData.append('userResidentKey', values.residentKey);
        formData.append('maintenanceLocation', values.maintenanceLocation);
        formData.append('maintenanceConcern', values.maintenanceConcern);
    
        // Append each file as IFormFile
        fileList.forEach((file, index) => {
            formData.append(`attachments`, file.originFileObj, file.name); // Assuming file.data is the Blob or File object
        });
        let req = {
          request:formData
        }
       
        if(formData){
          dispatch(MaintenanceAction.CreateMaintennceRequest(req))
        }
       
        handleClearButton();
        // Optionally, perform additional actions upon successful API response
      } catch (error) {
        Swal.fire({
          text: "Submission unsuccessfull. Please try again or contact us.",
          icon: "error",
          confirmButtonColor: "#5A7890",
          customClass: {
            title: "text-danger", // Custom class for the title text
            content: "text-danger", // Custom class for the content text
          },
        });
        // Handle error state or display error message to the user
      }
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
  
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    function validatePhoneNumber(phoneNumber) {
      // Remove any non-digit characters
      const cleaned = phoneNumber.replace(/\D/g, '');
    
      // Check if the cleaned phone number has 10 digits (for US numbers)
      const isValid = /^\d{10}$/.test(cleaned);
      
      return isValid;
    }
  const HandleOnChange = async (e) => {
    debugger;
    const { id, value } = e?.target;
    const updatedMaintenance = { ...maintenance, [id]: value };
    setMaintenance(updatedMaintenance);
    form.setFieldsValue(updatedMaintenance);
    
    if (id === "state" && modifiedCitys) {
      debugger;
      const cities = modifiedCitys?.[value];
      let newCities = [];
      if (cities?.length > 0) {
        for (let items of cities) {
          newCities.push({ name: items, value: items });
        }
      }
      setCity(newCities);
    }
    if (id === "city" && modifiedCitys) {
      debugger;
      const communities = communitiesList?.[value];
      let newCommunities = [];
      if (Object.keys(communities).length > 0) {
        for (let items of Object.keys(communities)) {
          Object.entries(communities).map(([key, value]) => newCommunities.push({ name: key, value: value }))
        }
      }
      setCommunities(newCommunities);
    }
  };

  useEffect(() => {
    if (states?.length > 0) {
      const newState = states.map((item) => ({
        name: item,
        value: item,
      }));
      setState(newState);
    }
  }, [states]);
  
  const validationRules = Validation.getValidation([
    "state",
    "city",
    "communities",
    "firstName",
    "lastName",
    "address",
    "cityName",
    "stateName",
    "zip",
    "phone",
    "email",
    "residentKey",
    "maintenanceLocation",
    "maintenanceConcern",
    "files"
  ]);

  function handleClearButton () {
    form.resetFields(); // Resets all form fields
    setFileList([]); // Clears the file list
    setPreviewImage(""); // Clears the preview image
    setPreviewOpen(false); // Closes the preview modal if open
    setMaintenance({}); // Resets maintenance state
    setCity([]); // Clears city options
    setCommunities([]); // Clears communities options
  };
  
  useEffect(()=>{
    dispatch(MaintenanceAction.MaintennceRequest())
  },[])
  

  return (
    <>

  {(data?.loading || maintenanceRes?.loading) && <Spinner/>}
      <Row justify={"center"}>
        <Col sm={20} className="text-center">
          <div className="text-center mt-5">
            <h1 className="heading-maintenance" style={{color:"#5A7890"}}>Maintenance Request</h1>
          </div>
        </Col>
        <Col sm={20} className="a">
          <div className="mt-5">
            <p className="description-maintenance" style={{ fontSize: '20px', marginBottom: '4rem'}}>Please complete this form to request maintenance on any common areas in your community. Please note - AAM Maintenance Requests do not cover areas owned by municipalities or individual owners. If you have any questions, please contact your Community Manager.</p>
          </div>
        </Col>
        <Col sm={20}>
          <Form style = {{marginBottom: '12rem'}}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
           
              <SelectBox
                label="State"
                name="state"
                options={newStates}
                className="custom-scrollbar"
                placeholder="State"
                onChange={(e) => HandleOnChange(e)}
                size="large"
                rules={validationRules.state}
              />
            
            {form.getFieldValue("state") && (
              <SelectBox
                label="City"
                name="city"
                options={city}
                className="custom-scrollbar"
                placeholder="City"
                onChange={(e) => HandleOnChange(e)}
                size="large"
                rules={validationRules.city}
              />
            )}

            {form.getFieldValue("city") && (
              <SelectBox
                label="Communities"
                name="communities"
                options={communities}
                className="custom-scrollbar"
                placeholder="Communities"
                onChange={(e) => HandleOnChange(e)}
                size="large"
                rules={validationRules.communities}
              />
            )}
            {form.getFieldValue("communities") && 
              <>
                <TextInput rules={validationRules.firstName} name = "firstName"size="large" label = "First Name" placeholder = "Enter First Name" onChange={(e) => HandleOnChange(e)} />
                <TextInput rules={validationRules.lastName} name = "lastName"size="large" label = "Last Name" placeholder = "Enter Last Name" onChange={(e) => HandleOnChange(e)} />
                <TextInput rules={validationRules.address} name = "address"size="large" label = "Your Address" placeholder = "Enter Your Address" onChange={(e) => HandleOnChange(e)} />
                <TextInput rules={validationRules.cityName} name = "cityName"size="large" label = "Your City" placeholder = "Enter Your City" onChange={(e) => HandleOnChange(e)} />
                <TextInput rules={validationRules.stateName} name = "stateName"size="large" label = "Your State" placeholder = "Enter Your State" onChange={(e) => HandleOnChange(e)} />
                <TextInput rules={validationRules.zip} name = "zip"size="large" label = "Your Zip" placeholder = "Enter Your Zip" onChange={(e) => HandleOnChange(e)} />
                <TextInput rules={validationRules.phone} name = "phone"size="large" label = "Daytime Phone" placeholder = "Enter Daytime Phone" onChange={(e) => HandleOnChange(e)} />
                <TextInput rules={validationRules.email} name = "email" size="large" label = "Email Address" placeholder = "Enter Email Address" onChange={(e) => HandleOnChange(e)} />
                <TextInput rules={validationRules.residentKey} name = "residentKey"size="large" label = "Resident Key" placeholder = "Enter Resident Key" onChange={(e) => HandleOnChange(e)} />
                <TextArea rows={6} rules={validationRules.maintenanceLocation} name = "maintenanceLocation"size="large" label = "Maintenance Location" placeholder = "Enter Maintenance Location" onChange={(e) => HandleOnChange(e)} />
                <TextArea rows={6} rules={validationRules.maintenanceConcern} name = "maintenanceConcern"size="large" label = "Maintenance Concern" placeholder = "Enter Maintenance Concern" onChange={(e) => HandleOnChange(e)} />
                <UploadButton handlePreview={handlePreview} fileList={fileList} setFileList={setFileList} setPreviewImage={setPreviewImage} previewImages={previewImage}  setPreviewOpen={setPreviewOpen} previewOpen={previewOpen} name = "files"handleChange={handleChange} number={10}  />
              </>
            }
            <Button onClick={handleClearButton} style = {{ marginLeft: 8, borderRadius: 19, border:'1px solid #5A7890', color: '#5A7890', backgroundColor: '#fff', height: '2.5rem', width: '8rem' }}>Clear</Button>
            <Button htmlType="submit" class ="submit-button" style = {{ marginLeft: 8, borderRadius: 19, color: 'white', backgroundColor: '#5A7890', height: '2.5rem', width: '8rem' }}>Submit</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Maintenance;
