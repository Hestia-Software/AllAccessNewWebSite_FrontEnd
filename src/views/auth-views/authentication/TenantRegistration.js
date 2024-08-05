import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "antd";
import Component from "../../../components";
import Utils from "../../../utils";
import Validation from "../../../utils/Validation";
import TextArea from "antd/es/input/TextArea";
import { FormLabel } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { env } from "../../../config/EnvirementConfig";
import PrefixPath from "../../../config/AppConfig";
import { useDispatch, useSelector } from "react-redux";
import MaintenanceAction from "../../../redux/actions/AuthAction/MaintenanceAction";
import AdditionalFeeAction from "../../../redux/actions/AuthAction/AdditionalFeeAction";
import DisclaimerAction from "../../../redux/actions/AuthAction/DisclaimerAction";
import Spinner from "../../../components/Spinner/Spiner";
import ModalComponent from "../../../components/Modal/Modal";
import Checkbox from "antd/es/checkbox/Checkbox";
import TenantAction from "../../../redux/actions/AuthAction/TenantAction";
import { type } from "@testing-library/user-event/dist/type";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Tenant = () => {
  const dispatch = useDispatch();
  const {
    TextInput,
    SelectBox,
    CheckBox,
    UploadButton,
    TextArea,
    DynamicTable,
    Modal,
    Radio,
    DynamicForm,
  } = Component;
  const [formCount, setFormCount] = useState(0);
  const [temp, setTemp] = useState({});
  const [formData, setFormData] = useState([]);
  const [isUnder18, setIsUnder18] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState("");
  const [isEmergencyContactModalVisible, setIsEmergencyContactModalVisible] =
    useState(false);
  const [isVehicleModalVisible, setIsVehicleModalVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [showContactTable, setShowContactTable] = useState(false);
  const [isPetModalVisible, setIsPetModalVisible] = useState(false);
  const [tenantData, setTenantData] = useState([]);
  const [tenantId, setTenantId] = useState(1);
  const [toEditId, setToEditId] = useState(0);
  const [contactPage, setContactPage] = useState("");
  const [conatcToEditId, setContactToEditId] = useState(0);
  const [petId, setPetId] = useState(1);
  const [contactId, setContactId] = useState(1);
  const [vehicleId, setVehicleId] = useState(1);
  const [vehicleData, setVehicleData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [petData, setPetData] = useState([]);
  const [state, setState] = useState([]);
  const [form] = Form.useForm();
  const [tenantForm] = Form.useForm();
  const [vehicleForm] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [petForm] = Form.useForm();
  const [maintenance, setMaintenance] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [contact, setContact] = useState({});
  const [pet, setPet] = useState({});
  const [tenant, setTenant] = useState({});
  const [city, setCity] = useState([]);
  const [tenantCity, setTenantCity] = useState([]);
  const [communities, setCommunities] = useState([]);

  const [fee, setFee] = useState("");
  const [stateDisclaimer, setStateDisclaimer] = useState("");
  const [propertyDisclaimer, setPropertyDisclaimer] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTenantIndex, setExpandedTenantIndex] = useState(-1);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedTenant, setEditedTenant] = useState({
    tenantFirstName: "",
    tenantLastName: "",
    tenantAddress1: "",
    tenantState: "",
    tenantCity: "",
    tenantZip: "",
    tenantPhone: "",
    tenantEmail: "",
    violation: false,
    age: false,
  });
  const [editIndex, setEditIndex] = useState(-1);

  // Function to open modal to edit tenant details
  const handleEdit = (tenantToEdit) => {
    debugger;
    setToEditId(tenantToEdit.id);
    let tempTenant = {};
    tempTenant["tenantId"] = tenantToEdit.id;
    tempTenant["tenantFirstName"] = tenantToEdit.FirstName;
    tempTenant["tenantLastName"] = tenantToEdit.LastName;
    tempTenant["tenantDesignation"] = tenantToEdit.Designation;
    tempTenant["tenantAddress1"] = tenantToEdit.MailingAddress1;
    tempTenant["tenantState"] = tenantToEdit.State;
    tempTenant["tenantCity"] = tenantToEdit.City;
    tempTenant["tenantZip"] = tenantToEdit.zip;
    tempTenant["tenantPhone"] = tenantToEdit.Phone;
    tempTenant["tenantEmail"] = tenantToEdit.Email;
    tempTenant["violation"] = tenantToEdit.Voilation;
    tempTenant["age"] = tenantToEdit.Under18;
    tempTenant["contactData"] = tenantToEdit.EmergencyContacts;
    setContactData(tenantToEdit.EmergencyContacts);
    setTemp(tempTenant);
    tenantForm.setFieldsValue(tempTenant);
    showModal("edit");
  };
  const handleEditContact = (contactToEdit) => {
    debugger;

    setContactToEditId(contactToEdit.id);
    let tempContact = {};
    tempContact["contactFirstName"] = contactToEdit.FirstName;
    tempContact["contactLastName"] = contactToEdit.LastName;
    tempContact["contactEmail"] = contactToEdit.Email;
    tempContact["contactPhone"] = contactToEdit.Phone;
    contactForm.setFieldsValue(tempContact);
    showContactModal("edit");
  };

  // Function to update edited tenant data
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedTenant((prevTenant) => ({
      ...prevTenant,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to save edited tenant data
  const handleSaveEdit = () => {
    // Update tenantData with editedTenant
    const updatedTenantData = [...tenantData];
    updatedTenantData[editIndex] = editedTenant;
    // Update state or dispatch an action to update data
    setTenantData(updatedTenantData);

    // Close the edit modal
    setIsEditModalVisible(false);
  };
  const toggleDetails = (index) => {
    if (expandedTenantIndex === index) {
      setExpandedTenantIndex(-1); // Collapse if already expanded
    } else {
      setExpandedTenantIndex(index); // Expand if not expanded
    }
  };
  const allDisRes = useSelector((state) => state.GetAllDisclaimer);
  const disObject = allDisRes?.GetAllDisclaimer;
  const allFeeRes = useSelector((state) => state?.GetAllAdditionalFee);
  const feeObject = allFeeRes.GetAllAdditionalFee;
  const additionalFeeResponse = useSelector((state) => state?.GetAdditionalFee);

  const data = useSelector((state) => state?.Maintenance);
  const tenantRes = useSelector((state) => state?.CreateTenant);
  const states =
    data?.maintenance?.item1 &&
    Object.keys(data?.maintenance?.item1)?.length > 0 &&
    Object.entries(data?.maintenance?.item1).map(([key, value]) => key);

  let newStates = [];
  states &&
    states.forEach((element) => {
      element = element.substring(1, element.length - 1);
      const name = element.split(",")[0].trim();
      let value = element.split(",")[1].trim();
      newStates.push({ name: name, value: value });
    });

  const citys = data?.maintenance?.item1;
  const modifiedCitys =
    citys &&
    Object.entries(citys).reduce((acc, [key, value]) => {
      key = key.substring(1, key.length - 1);
      const newKey = key.split(",")[1].trim();
      acc[newKey] = value;
      return acc;
    }, {});
  const communitiesList = data?.maintenance?.item2;
  const showModal = (mode) => {
    setIsModalVisible(true);
    setPage(mode);
  };
  const showVehicleModal = () => {
    setIsVehicleModalVisible(true);
  };
  const showContactModal = (mode) => {
    setIsContactModalVisible(true);
    setContactPage(mode);
  };
  const showPetModal = () => {
    setIsPetModalVisible(true);
  };
  const openEmergencyContactModal = () => {
    setIsEmergencyContactModalVisible(true);
  };
  const handlePetDelete = (id) => {
    debugger;
    const updatedData = petData.filter((pet) => pet.id !== id);
    setPetData(updatedData);
  };
  function handleTenantDelete(id) {
    debugger;
    const updatedData = tenantData.filter((tenant) => tenant.id !== id);
    setTenantData(updatedData);
  }
  const handleContactDelete = (id) => {
    debugger;
    const updatedData = contactData.filter((contact) => contact.id !== id);
    setContactData(updatedData);
  };
  const handleVehicleDelete = (id) => {
    debugger;
    const updatedData = vehicleData.filter((vehicle) => vehicle.id !== id);
    setVehicleData(updatedData);
  };
  const closeEmergencyContactModal = () => {
    setIsEmergencyContactModalVisible(false);
  };
  const handleCancel = () => {
    tenantForm.resetFields();
    setIsModalVisible(false);
  };
  const handleVehicleCancel = () => {
    vehicleForm.resetFields();
    setIsVehicleModalVisible(false);
  };
  const handleContactCancel = () => {
    debugger;
    contactForm.resetFields();
    setIsContactModalVisible(false);
  };
  const handlePetCancel = () => {
    petForm.resetFields();
    setIsPetModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    debugger;
    if (!isContactModalVisible) {
      const newTenant = {
        id: tenantId,
        FirstName: tenant.tenantFirstName,
        LastName: tenant.tenantLastName,
        Designation: tenant.age ? tenant.tenantDesignation : "",
        MailingAddress1: tenant.tenantAddress1,
        State: tenant.tenantState,
        City: tenant.tenantCity,
        zip: tenant.tenantZip,
        Phone: tenant.tenantPhone,
        Email: tenant.tenantEmail,
        Voilation: tenant.violation,
        Under18: tenant.age,
        EmergencyContacts: contactData,
      };
      if (page === "edit") {
        newTenant.id = toEditId;
        const updatedTenants = tenantData.map((t) =>
          t.id === newTenant.id ? newTenant : t
        );
        setTenantData(updatedTenants);
      } else {
        setTenantId(tenantId + 1);
        setTenantData([...tenantData, newTenant]);
      }
      setContactData([]);
      tenantForm.resetFields();
      setIsModalVisible(false);
    }
  };
  const handleVehicleFormSubmit = (values) => {
    debugger;
    const newVehicle = {
      id: vehicleId,
      Year: vehicle.vehicleYear,
      Make: vehicle.vehicleMake,
      Model: vehicle.vehicleModel,
      Color: vehicle.vehicleColor,
      License: vehicle.vehicleLicensePlate,
      State: vehicle.vehicleState,
      Spot: vehicle.vehicleSpot,
    };
    setVehicleId(vehicleId + 1);
    setVehicleData([...vehicleData, newVehicle]);
    vehicleForm.resetFields();
    setIsVehicleModalVisible(false);
  };
  const handleContactFormSubmit = (values) => {
    debugger;
    const newContact = {
      id: contactId,
      FirstName: contact.contactFirstName,
      LastName: contact.contactLastName,
      Email: contact.contactEmail,
      Phone: contact.contactPhone,
    };

    if (contactPage === "edit") {
      newContact.id = conatcToEditId;
      const updatedContacts = contactData.map((c) =>
        c.id === newContact.id ? newContact : c
      );
      setContactData(updatedContacts);
    } else {
      setContactId(contactId + 1);
      setContactData([...contactData, newContact]);
    }

    contactForm.resetFields();
    setIsContactModalVisible(false);
  };
  const handlePetFormSubmit = (values) => {
    debugger;
    const newPet = {
      id: petId,
      Name: pet.petName,
      Type: pet.petType,
      Breed: pet.petBreed,
      RabiesDueDate: pet.petDueDate,
      License: pet.petLicense,
      Age: pet.petAge,
    };
    setPetId(petId + 1);
    setPetData([...petData, newPet]);
    petForm.resetFields();
    setIsPetModalVisible(false);
  };

  const options = [
    {
      value: true,
      name: "New",
    },
    {
      value: false,
      name: "Renew",
    },
  ];
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handleChange = ({ fileList: newFileList }) => {
    debugger;
    let fileNames = [];
    let i = 0;
    newFileList.forEach((file) => {
      if (i == 0) {
        fileNames = [...fileNames, file.name];
        i = i + 1;
      } else {
        if (fileNames.includes(file.name)) {
          Swal.fire({
            title: "Warning",
            text: "File name already exists.(" + file.name + ")",
            icon: "warning",
            confirmButtonColor: "#44637e",
          });
          newFileList.splice(newFileList.indexOf(file), 1);
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
      } else {
        filesChecked.push(file);
      }
    });
    setFileList(filesChecked);
  };

  const onFinish = async (values) => {
    debugger;
    if (tenantData.length == 0) {
      Swal.fire({
        text: "Please provide atleast one tenant info.",
        icon: "warning",
        confirmButtonColor: "#5A7890",
        customClass: {
          title: "text-danger", // Custom class for the title text
          content: "text-danger", // Custom class for the content text
        },
      });
      return;
    }
    if (!tenantData.some((tenant) => tenant.Under18 == false)) {
      Swal.fire({
        text: "Please provide atleast one tenant who is not under 18.",
        icon: "warning",
        confirmButtonColor: "#5A7890",
        customClass: {
          title: "text-danger", // Custom class for the title text
          content: "text-danger", // Custom class for the content text
        },
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("state", form.getFieldValue("state"));
      formData.append("city", form.getFieldValue("city"));
      formData.append("property", form.getFieldValue("communities"));
      formData.append(
        `leaseInfo.newOrRenew`,
        form.getFieldValue("newOrRenew") ? "New" : "Renew"
      );
      formData.append(`leaseInfo.startDay`, form.getFieldValue("startDay"));
      formData.append(`leaseInfo.endDay`, form.getFieldValue("endDay"));
      formData.append(`cardNumber`, form.getFieldValue("cardNumber"));
      formData.append(`cvv`, form.getFieldValue("cvv"));
      formData.append(`cardExpiry`, form.getFieldValue("cardExpiry"));
      formData.append(`cardHolderName`, form.getFieldValue("cardHolderName"));
      formData.append(`amount`, fee);

      fileList.forEach((file, index) => {
        formData.append(`supportingDocuments`, file.originFileObj, file.name); // Assuming file.data is the Blob or File object
      });
      tenantData.forEach((obj, index) => {
        formData.append(`tenants[${index}].firstName`, obj.FirstName);
        formData.append(`tenants[${index}].lastName`, obj.LastName);
        formData.append(`tenants[${index}].designation`, obj.Designation);
        formData.append(
          `tenants[${index}].mailingAddress1`,
          obj.MailingAddress1
        );
        formData.append(`tenants[${index}].state`, obj.State);
        formData.append(`tenants[${index}].city`, obj.City);
        formData.append(`tenants[${index}].zip`, obj.zip);
        formData.append(`tenants[${index}].phone`, obj.Phone);
        formData.append(`tenants[${index}].email`, obj.Email);
        formData.append(
          `tenants[${index}].voilation`,
          obj.Voilation ? "true" : "false"
        );
        formData.append(
          `tenants[${index}].under18`,
          obj.Under18 ? "true" : "false"
        );
        obj.EmergencyContacts.forEach((contact, i) => {
          formData.append(
            `tenants[${index}].emergencyContacts[${i}].firstName`,
            contact.FirstName
          );
          formData.append(
            `tenants[${index}].emergencyContacts[${i}].lastName`,
            contact.LastName
          );
          formData.append(
            `tenants[${index}].emergencyContacts[${i}].email`,
            contact.Email
          );
          formData.append(
            `tenants[${index}].emergencyContacts[${i}].phone`,
            contact.Phone
          );
        });
      });
      vehicleData.forEach((obj, index) => {
        formData.append(`vehicles[${index}].make`, obj.Make);
        formData.append(`vehicles[${index}].model`, obj.Model);
        formData.append(`vehicles[${index}].year`, obj.Year);
        formData.append(`vehicles[${index}].color`, obj.Color);
        formData.append(`vehicles[${index}].license`, obj.License);
        formData.append(`vehicles[${index}].state`, obj.State);
        formData.append(`vehicles[${index}].spot`, obj.Spot);
      });
      petData.forEach((obj, index) => {
        formData.append(`pets[${index}].name`, obj.Name);
        formData.append(`pets[${index}].type`, obj.Type);
        formData.append(`pets[${index}].breed`, obj.Breed);
        formData.append(`pets[${index}].rabiesDueDate`, obj.RabiesDueDate);
        formData.append(`pets[${index}].license`, obj.License);
        formData.append(`pets[${index}].age`, obj.Age);
      });
      let req = {
        request: formData,
      };

      if (req) {
        dispatch(TenantAction.CreateTenantRequest(req));
      }
      handleClearButton();
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
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const HandleOnChange = async (e) => {
    debugger;
    const { id, value } = e?.target;
    const updatedMaintenance = { ...maintenance, [id]: value };
    setMaintenance(updatedMaintenance);
    form.setFieldsValue(updatedMaintenance);

    if (id === "state" && modifiedCitys) {
      setStateDisclaimer("");
      setPropertyDisclaimer("");
      const cities = modifiedCitys?.[value];
      form.resetFields(["city", "communities"]);
      if (value in disObject) {
        setStateDisclaimer(disObject[value]);
      }
      let newCities = [];
      if (cities?.length > 0) {
        for (let items of cities) {
          newCities.push({ name: items, value: items });
        }
      }
      setCity(newCities);
    }
    if (id === "city" && modifiedCitys) {
      form.resetFields(["communities"]);
      const communities = communitiesList?.[value];
      let newCommunities = [];
      if (Object.keys(communities).length > 0) {
        for (let items of Object.keys(communities)) {
          Object.entries(communities).map(([key, value]) =>
            newCommunities.push({ name: key, value: value })
          );
        }
      }
      setCommunities(newCommunities);
    }
    if (id === "communities" && modifiedCitys) {
      debugger;
      setFee("");
      setPropertyDisclaimer("");
      if (value in feeObject) {
        setFee(feeObject[value]);
      }
      if (value in disObject) {
        setPropertyDisclaimer(disObject[value]);
      }
    }
  };

  const HandleTenantOnChange = async (e) => {
    debugger;
    const { name, id, value } = e?.target;
    let updatedTenant;
    if (name == "violation" || name == "age") {
      if (name == "age") {
        setIsUnder18(e.target.checked);
      }
      updatedTenant = { ...tenant, [name]: e.target.checked };
    } else {
      updatedTenant = { ...tenant, [id]: value };
    }
    if (id === "tenantState" && modifiedCitys) {
      const cities = modifiedCitys?.[value];
      tenantForm.resetFields(["tenantCity"]);
      let newCities = [];
      if (cities?.length > 0) {
        for (let items of cities) {
          newCities.push({ name: items, value: items });
        }
      }
      setTenantCity(newCities);
    }
    setTenant(updatedTenant);
    tenantForm.setFieldsValue(updatedTenant);
  };
  const HandleVehicleOnChange = async (e) => {
    const { id, value } = e?.target;
    const updatedVehicle = { ...vehicle, [id]: value };
    setVehicle(updatedVehicle);
    vehicleForm.setFieldsValue(updatedVehicle);
  };
  const HandleContactOnChange = async (e) => {
    debugger;
    const { id, value } = e?.target;
    const updatedContact = { ...contact, [id]: value };
    setContact(updatedContact);
    contactForm.setFieldsValue(updatedContact);
  };
  const HandlePetOnChange = async (e) => {
    debugger;
    const { id, value } = e?.target;
    const updatedPet = { ...pet, [id]: value };
    setPet(updatedPet);
    petForm.setFieldsValue(updatedPet);
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
  const dateFormatRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  const expiryDateFormatRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  function isValidDate(dateStr) {
    const [month, day, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date.getFullYear() === year
    );
  }

  const validationRules = {
    firstName: [
      { required: true, message: "First Name is required" },
      { max: 100, message: "First Name cannot be longer than 100 characters" },
      {
        min: 1,
        message: "First Name cannot be empty",
      },
      {
        pattern: /^[a-zA-Z\s]+$/,
        message: "First Name must contain only letters and spaces",
      },
    ],
    lastName: [
      { required: true, message: "Last Name is required" },
      { max: 100, message: "Last Name cannot be longer than 100 characters" },
      {
        min: 1,
        message: "Last Name cannot be empty",
      },
      {
        pattern: /^[a-zA-Z\s]+$/,
        message: "Last Name must contain only letters and spaces",
      },
    ],
    address: [
      { required: true, message: "Address is required" },
      { max: 2000, message: "Address cannot be longer than 2000 characters" },
      {
        min: 1,
        message: "Address cannot be empty",
      },
    ],
    state: [{ required: true, message: "State is required" }],
    city: [{ required: true, message: "City is required" }],
    property: [{ required: true, message: "City is required" }],
    zip: [
      { required: true, message: "Zip code is required" },
      {
        pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
        message: "Valid Zip code formats are: 12345 and 12345-6789",
      },
    ],
    phone: [
      { required: true, message: "Phone number is required" },
      { pattern: /^[0-9]{10}$/, message: "Phone number must be 10 digits" },
    ],
    email: [
      { required: true, message: "Email is required" },
      { type: "email", message: "Invalid email format" },
      { max: 180, message: "Address cannot be longer than 180 characters" },
    ],
    designation: [
      { required: true, message: "Designation is required for those under 18" },
      { max: 180, message: "Designation cannot be longer than 180 characters" },
      {
        min: 1,
        message: "Address cannot be empty",
      },
      {
        pattern: /^[a-zA-Z\s]+$/,
        message: "Designation must contain only letters and spaces",
      },
    ],
    date: [
      {
        required: true,
        message: "Date is required",
      },
      {
        pattern: dateFormatRegex,
        message: "Date must be in the format MM/DD/YYYY",
      },
      {
        validator: (_, value) => {
          if (!value || isValidDate(value)) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Invalid date"));
        },
      },
    ],
    year: [
      {
        required: true,
        message: "Year is required",
      },
      {
        pattern: /^[0-9]{4}$/,
        message: "Year must be a 4-digit number",
      },
      {
        validator: (_, value) => {
          const currentYear = new Date().getFullYear();
          if (!value || (value >= 1900 && value <= currentYear)) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error(`Year must be between 1900 and ${currentYear}`)
          );
        },
      },
    ],
    make: [
      {
        required: true,
        message: "Make is required",
      },
      {
        min: 1,
        message: "Make cannot be empty",
      },
      {
        max: 180,
        message: "Make cannot be more than 180 characters.",
      },
    ],
    model: [
      {
        required: true,
        message: "Model is required",
      },
      {
        min: 1,
        message: "Model cannot be empty",
      },
      {
        max: 180,
        message: "Model cannot be more than 180 characters.",
      },
    ],
    color: [
      {
        required: true,
        message: "Color is required",
      },
      {
        min: 1,
        message: "Color cannot be empty",
      },
      {
        max: 60,
        message: "Color cannot be more than 60 characters.",
      },
      {
        pattern: /^[a-zA-Z\s]+$/,
        message: "Color must contain only letters and spaces",
      },
    ],
    license: [
      {
        required: true,
        message: "License is required",
      },
      {
        pattern: /^[A-Z0-9-]+$/,
        message: "License can only contain letters, numbers, and hyphens",
      },
      {
        max: 150,
        message: "License cannot be more than 150 characters.",
      },
    ],
    spot: [
      {
        required: true,
        message: "Spot / Garage is required",
      },
      {
        min: 1,
        message: "Spot / Garage cannot be empty",
      },
      {
        max: 180,
        message: "Spot / Garage cannot be more than 180 characters.",
      },
    ],
    name: [
      { required: true, message: "Name is required" },
      { max: 180, message: "Name cannot be longer than 180 characters" },
      {
        min: 1,
        message: "Name cannot be empty",
      },
      {
        pattern: /^[a-zA-Z\s]+$/,
        message: "Name must contain only letters and spaces",
      },
    ],
    type: [
      { required: true, message: "Type is required" },
      { max: 180, message: "Type cannot be longer than 180 characters" },
      {
        min: 1,
        message: "Type cannot be empty",
      },
    ],
    breed: [
      { required: true, message: "Breed is required" },
      { max: 140, message: "Breed cannot be longer than 140 characters" },
      {
        min: 1,
        message: "Breed cannot be empty",
      },
    ],
    age: [
      {
        required: true,
        message: "Age is required",
      },
    ],
    newOrRenew: [
      {
        required: true,
        message: "Type of Lease is required.",
      },
    ],
    cardNumber: [
      {
        required: true,
        message: "Credit Card Number is required",
      },
      {
        pattern: /^[0-9]{13,19}$/,
        message: "Credit Card Number must be between 13 and 19 digits",
      },
    ],
    cvv: [
      {
        required: true,
        message: "CVV is required",
      },
      {
        pattern: /^[0-9]{3,4}$/,
        message: "CVV must be 3 or 4 digits",
      },
    ],
    cardExpiry: [
      {
        required: true,
        message: "Expiry Date is required",
      },
      {
        pattern: expiryDateFormatRegex,
        message: "Expiry Date must be in the format MM/YY",
      },
      // {
      //   validator: (_, value) => {
      //     if (!value) {
      //       return Promise.reject(new Error("Expiry Date is required"));
      //     }
      //     const [month, year] = value.split("/").map(Number);
      //     const currentYear = currentDate.getFullYear();
      //     const currentMonth = currentDate.getMonth() + 1;

      //     if (
      //       year < currentYear ||
      //       (year === currentYear && month < currentMonth)
      //     ) {
      //       return Promise.reject(
      //         new Error("Expiry Date must be in the future")
      //       );
      //     }

      //     return Promise.resolve();
      //   },
      // },
    ],
    cardHolderName: [
      {
        required: true,
        message: "Card Holder Name is required",
      },
      {
        pattern: /^[a-zA-Z\s]+$/,
        message: "Card Holder Name must contain only letters and spaces",
      },
    ],
  };

  function handleClearButton() {
    debugger;
    form.resetFields(); // Resets all form fields
    setCity([]); // Clears city options
    setCommunities([]); // Clears communities options
    setStateDisclaimer(""); // Clears communities options
    setPropertyDisclaimer(""); // Clears communities options
    setFee(""); // Clears communities options
    setTenantData([]); // Clears communities options
    setContactData([]); // Clears communities options
    setPetData([]); // Clears communities options
    setVehicleData([]); // Clears communities options
    setFileList([]); // Clears communities options
  }

  useEffect(() => {
    dispatch(MaintenanceAction.MaintennceRequest());
  }, []);

  useEffect(() => {
    dispatch(AdditionalFeeAction.GetAllAdditionalFeeRequest());
  }, []);

  useEffect(() => {
    dispatch(DisclaimerAction.GetAllDisclaimerRequest());
  }, []);
  const columns = [
    {
      title: "First Name",
      dataIndex: "tenantFirstName",
      key: "tenantFirstName",
    },
    { title: "Last Name", dataIndex: "tenantLastName", key: "tenantLastName" },
    {
      title: "Designation",
      dataIndex: "tenantDesignation",
      key: "tenantDesignation",
    },
    {
      title: "Address One",
      dataIndex: "tenantAddress1",
      key: "tenantAddress1",
    },
    { title: "State", dataIndex: "tenantState", key: "tenantState" },
    { title: "City", dataIndex: "tenantCity", key: "tenantCity" },
    { title: "Zip", dataIndex: "tenantZip", key: "tenantZip" },
    { title: "Phone", dataIndex: "tenantPhone", key: "tenantPhone" },
    { title: "Email", dataIndex: "tenantEmail", key: "tenantEmail" },
    { title: "Voilation", dataIndex: "violation", key: "violation" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Emergency Contact(s)", dataIndex: "ec", key: "ec" },
  ];
  const vehicleColumns = [
    { title: "Year", dataIndex: "vehicleYear", key: "vehicleYear" },
    { title: "Make", dataIndex: "vehicleMake", key: "vehicleMake" },
    { title: "Model", dataIndex: "vehicleModel", key: "vehicleModel" },
    { title: "Color", dataIndex: "vehicleColor", key: "vehicleColor" },
    {
      title: "License Plate",
      dataIndex: "vehicleLicensePlate",
      key: "vehicleLicensePlate",
    },
    { title: "State", dataIndex: "vehicleState", key: "vehicleState" },
    { title: "Spot", dataIndex: "vehicleSpot", key: "vehicleSpot" },
  ];
  const petColumns = [
    { title: "Name", dataIndex: "petName", key: "petName" },
    { title: "Type", dataIndex: "petType", key: "petType" },
    { title: "Breed", dataIndex: "petBreed", key: "petBreed" },
    { title: "Rabies Due Date", dataIndex: "petDueDate", key: "petDueDate" },
    { title: "License", dataIndex: "petLicense", key: "petLicense" },
    { title: "Age", dataIndex: "petAge", key: "petAge" },
  ];
  const contactColumns = [
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
    },
    { title: "Email", dataIndex: "Email", key: "Email" },
    { title: "Phone", dataIndex: "Phone", key: "Phone" },
  ];

  return (
    <>
      {(data?.loading ||
        tenantRes?.loading ||
        allFeeRes?.loading ||
        allDisRes?.loading) && <Spinner />}
      <Row justify={"center"}>
        <Col sm={20} className="text-center">
          <div className="text-center mt-5">
            <h1 className="heading-maintenance" style={{ color: "#5A7890" }}>
              Tenant Registration
            </h1>
          </div>
        </Col>
        <Col sm={20} className="a">
          <div className="mt-5">
            <p
              className="description-maintenance"
              style={{ fontSize: "20px", marginBottom: "1rem" }}
            >
              To see tenant registration rules in your location and register
              electronically, select your state below.
            </p>
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
              <>
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
              </>
            )}

            {form.getFieldValue("city") && (
              <SelectBox
                label="Properties"
                name="communities"
                options={communities}
                className="custom-scrollbar"
                placeholder="Communities"
                onChange={(e) => HandleOnChange(e)}
                size="large"
                rules={validationRules.property}
              />
            )}
            {form.getFieldValue("communities") && (
              <>
                <section>
                  <p
                    className="text-center"
                    style={{
                      color: "#5A7890",
                      fontSize: "22px",
                      marginBottom: "2rem",
                      marginTop: "3rem",
                      fontWeight: "bold",
                    }}
                  >
                    Tenant Details
                  </p>
                  <Button
                    style={{
                      borderRadius: 19,
                      border: "1px solid #5A7890",
                      color: "#5A7890",
                      backgroundColor: "#fff",
                      height: "2.5rem",
                      width: "8rem",
                      marginBottom: "2rem",
                    }}
                    onClick={() => {
                      showModal("add");
                    }}
                  >
                    Add Tenant
                  </Button>
                  <Modal
                    title="Add Tenant"
                    centered
                    footer=""
                    open={isModalVisible}
                    Ok={handleFormSubmit}
                    Cancel={handleCancel}
                    width={900} // Adjust width as per your design
                  >
                    {(pageName) => (
                      <Form form={tenantForm} onFinish={handleFormSubmit}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.firstName}
                              name="tenantFirstName"
                              size="large"
                              label="First Name"
                              placeholder="Enter First Name"
                              onChange={(e) => HandleTenantOnChange(e)}
                            />
                          </Col>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.lastName}
                              name="tenantLastName"
                              size="large"
                              label="Last Name"
                              placeholder="Enter Last Name"
                              onChange={(e) => HandleTenantOnChange(e)}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <p
                            style={{ marginBottom: "15px", fontWeight: "bold" }}
                          >
                            Mailing Addresses
                          </p>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.address}
                              name="tenantAddress1"
                              size="large"
                              label="Address 1"
                              placeholder="Enter Address 1"
                              onChange={(e) => HandleTenantOnChange(e)}
                            />
                          </Col>
                          <Col span={12}>
                            <SelectBox
                              label="State"
                              name="tenantState"
                              options={newStates}
                              className="custom-scrollbar"
                              placeholder="Select State"
                              onChange={(e) => HandleTenantOnChange(e)}
                              size="large"
                              rules={validationRules.state}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <SelectBox
                              label="City"
                              name="tenantCity"
                              options={tenantCity}
                              className="custom-scrollbar"
                              placeholder="Select City"
                              onChange={(e) => HandleTenantOnChange(e)}
                              size="large"
                              rules={validationRules.city}
                            />
                          </Col>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.zip}
                              name="tenantZip"
                              size="large"
                              label="Zip"
                              placeholder="Enter Zip"
                              onChange={(e) => HandleTenantOnChange(e)}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.phone}
                              name="tenantPhone"
                              size="large"
                              label="Phone"
                              placeholder="Enter Phone"
                              onChange={(e) => HandleTenantOnChange(e)}
                            />
                          </Col>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.email}
                              name="tenantEmail"
                              size="large"
                              label="Email"
                              placeholder="Enter Email"
                              onChange={(e) => HandleTenantOnChange(e)}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={8}>
                            <Checkbox
                              name="violation"
                              value={true}
                              style={{
                                lineHeight: "32px",
                              }}
                              onChange={(e) => HandleTenantOnChange(e)}
                            >
                              Should get Violation Letters?
                            </Checkbox>
                          </Col>
                          <Col span={8}>
                            <Checkbox
                              name="age"
                              value={true}
                              style={{
                                lineHeight: "32px",
                              }}
                              onChange={(e) => HandleTenantOnChange(e)}
                            >
                              Under 18
                            </Checkbox>
                          </Col>
                          {isUnder18 && ( // Render TextInput only if Under 18 checkbox is checked
                            <Col span={8}>
                              <TextInput
                                rules={validationRules.designation}
                                name="tenantDesignation"
                                size="large"
                                label="Designation"
                                placeholder="Enter Designation"
                                onChange={(e) => HandleTenantOnChange(e)}
                              />
                            </Col>
                          )}
                        </Row>
                        <p
                          className="text-center"
                          style={{
                            color: "#5A7890",
                            fontSize: "18px",
                            marginBottom: "2rem",
                            marginTop: "3rem",
                            fontWeight: "bold",
                          }}
                        >
                          Emergency Contact
                        </p>
                        <Button
                          style={{
                            borderRadius: 19,
                            border: "1px solid #5A7890",
                            color: "#5A7890",
                            backgroundColor: "#fff",
                            height: "2.5rem",
                            width: "8rem",
                            marginBottom: "2rem",
                          }}
                          onClick={() => {
                            showContactModal("add");
                          }}
                        >
                          Add Contact
                        </Button>
                        <Modal
                          title="Add Contact"
                          centered
                          footer=""
                          open={isContactModalVisible}
                          Ok={handleContactFormSubmit}
                          Cancel={handleContactCancel}
                          width={900} // Adjust width as per your design
                        >
                          {(pageName) => (
                            <Form
                              form={contactForm}
                              onFinish={handleContactFormSubmit}
                            >
                              <Row gutter={16}>
                                <Col span={12}>
                                  <TextInput
                                    rules={validationRules.firstName}
                                    name="contactFirstName"
                                    size="large"
                                    label="First Name"
                                    placeholder="Enter First Name"
                                    onChange={(e) => HandleContactOnChange(e)}
                                  />
                                </Col>
                                <Col span={12}>
                                  <TextInput
                                    rules={validationRules.lastName}
                                    name="contactLastName"
                                    size="large"
                                    label="Last Name"
                                    placeholder="Enter Last Name"
                                    onChange={(e) => HandleContactOnChange(e)}
                                  />
                                </Col>
                              </Row>
                              <Row gutter={16}>
                                <Col span={12}>
                                  <TextInput
                                    rules={validationRules.email}
                                    name="contactEmail"
                                    size="large"
                                    label="Email"
                                    placeholder="Enter Email"
                                    onChange={(e) => HandleContactOnChange(e)}
                                  />
                                </Col>
                                <Col span={12}>
                                  <TextInput
                                    rules={validationRules.phone}
                                    name="contactPhone"
                                    size="large"
                                    label="Phone"
                                    placeholder="Enter Phone"
                                    onChange={(e) => HandleContactOnChange(e)}
                                  />
                                </Col>
                              </Row>
                              <Button
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
                                Add
                              </Button>
                            </Form>
                          )}
                        </Modal>
                        {/* <DynamicTable
                          columns={contactColumns}
                          data={contactData}
                        /> */}
                        <div
                          className="table-responsive"
                          style={{
                            overflowX: "auto",
                            maxWidth: "100%",
                            marginBottom: "2rem",
                          }}
                        >
                          <table className="table table-striped">
                            <thead className="thead-dark">
                              <tr
                                style={{ fontSize: "15px", fontWeight: "600" }}
                                className="text-center align-middle"
                              >
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Actions</td>
                              </tr>
                            </thead>
                            <tbody>
                              {contactData && contactData.length > 0 ? (
                                contactData.map((contact, index) => (
                                  <React.Fragment key={index}>
                                    <tr className="text-center align-middle">
                                      <td>{contact.FirstName}</td>
                                      <td>{contact.LastName}</td>
                                      <td>{contact.Email}</td>
                                      <td>{contact.Phone}</td>
                                      <td>
                                        <button
                                          className="btn btn-link"
                                          onClick={() =>
                                            handleEditContact(contact)
                                          }
                                        >
                                          Edit
                                        </button>
                                        <button
                                          className="btn btn-link"
                                          onClick={() =>
                                            handleContactDelete(contact.id)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                ))
                              ) : (
                                <tr>
                                  <td
                                    colSpan="10"
                                    className="text-center align-middle"
                                    style={{ height: "100px" }}
                                  >
                                    No data available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <Button
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
                          Submit
                        </Button>
                      </Form>
                    )}
                  </Modal>
                  {/* <div style={{ overflowX: "scroll" }}>
                    <DynamicTable columns={columns} data={tenantData} />
                  </div> */}
                  <div
                    className="table-responsive"
                    style={{ overflowX: "auto", maxWidth: "100%" }}
                  >
                    <table className="table table-striped">
                      <thead className="thead-dark">
                        <tr
                          style={{ fontSize: "15px", fontWeight: "600" }}
                          className="text-center align-middle"
                        >
                          <td>First Name</td>
                          <td>Last Name</td>
                          <td>Designation</td>
                          <td>Address</td>
                          <td>State</td>
                          <td>City</td>
                          <td>Zip</td>
                          <td>Phone</td>
                          <td>Email</td>
                          <td>Voilation</td>
                          <td>Age</td>
                          <td>Emergency Contacts</td>
                          <td>Actions</td>
                        </tr>
                      </thead>
                      <tbody>
                        {tenantData && tenantData.length > 0 ? (
                          tenantData.map((tenant, index) => (
                            <React.Fragment key={index}>
                              <tr className="text-center align-middle">
                                <td>{tenant.FirstName}</td>
                                <td>{tenant.LastName}</td>
                                <td>{tenant.Designation}</td>
                                <td>{tenant.MailingAddress1}</td>
                                <td>{tenant.State}</td>
                                <td>{tenant.City}</td>
                                <td>{tenant.zip}</td>
                                <td>{tenant.Phone}</td>
                                <td>{tenant.Email}</td>
                                <td>
                                  {tenant.Voilation == true ? "Yes" : "No"}
                                </td>
                                <td>
                                  {tenant.Under18 == true
                                    ? "Under 18"
                                    : "Not Under 18"}
                                </td>
                                <td>
                                  <button
                                    className="btn btn-link"
                                    onClick={openEmergencyContactModal}
                                  >
                                    View Contacts
                                  </button>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-link"
                                    onClick={() => handleEdit(tenant)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-link"
                                    onClick={() =>
                                      handleTenantDelete(tenant.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                              {expandedTenantIndex === index &&
                                tenant.EmergencyContacts.map(
                                  (contact, contactIndex) => (
                                    <tr
                                      key={`${index}-contact-${contactIndex}`}
                                    >
                                      <td colSpan="9">
                                        <strong>Contact Name:</strong>{" "}
                                        {contact.FirstName} {contact.LastName}
                                        <br />
                                        <strong>Email:</strong> {contact.Email}
                                        <br />
                                        <strong>Phone:</strong> {contact.Phone}
                                      </td>
                                    </tr>
                                  )
                                )}
                              <Modal
                                title="Emergency Contacts"
                                centered
                                footer=""
                                open={isEmergencyContactModalVisible}
                                Ok={openEmergencyContactModal}
                                Cancel={closeEmergencyContactModal}
                                width={900} // Adjust width as per your design
                              >
                                {(pageName) => (
                                  <table className="table table-bordered table-striped">
                                    <thead>
                                      <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {tenant.EmergencyContacts.map(
                                        (contact, contactIndex) => (
                                          <tr key={contactIndex}>
                                            <td>
                                              {contact.FirstName}{" "}
                                              {contact.LastName}
                                            </td>
                                            <td>{contact.Email}</td>
                                            <td>{contact.Phone}</td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                )}
                              </Modal>
                            </React.Fragment>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="14"
                              className="text-center align-middle"
                              style={{ height: "100px" }}
                            >
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
                <section>
                  <p
                    className="text-center"
                    style={{
                      color: "#5A7890",
                      fontSize: "22px",
                      marginBottom: "2rem",
                      marginTop: "3rem",
                      fontWeight: "bold",
                    }}
                  >
                    Vehicle Details
                  </p>
                  <Button
                    style={{
                      borderRadius: 19,
                      border: "1px solid #5A7890",
                      color: "#5A7890",
                      backgroundColor: "#fff",
                      height: "2.5rem",
                      width: "8rem",
                      marginBottom: "2rem",
                    }}
                    onClick={showVehicleModal}
                  >
                    Add Vehicle
                  </Button>
                  <Modal
                    title="Add Vehicle"
                    centered
                    footer=""
                    open={isVehicleModalVisible}
                    Ok={handleVehicleFormSubmit}
                    Cancel={handleVehicleCancel}
                    width={900} // Adjust width as per your design
                  >
                    {(pageName) => (
                      <Form
                        form={vehicleForm}
                        onFinish={handleVehicleFormSubmit}
                      >
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.year}
                              name="vehicleYear"
                              size="large"
                              label="Year"
                              placeholder="Enter Year"
                              onChange={(e) => HandleVehicleOnChange(e)}
                            />
                          </Col>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.make}
                              name="vehicleMake"
                              size="large"
                              label="Make"
                              placeholder="Enter Make"
                              onChange={(e) => HandleVehicleOnChange(e)}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.model}
                              name="vehicleModel"
                              size="large"
                              label="Model"
                              placeholder="Enter Model"
                              onChange={(e) => HandleVehicleOnChange(e)}
                            />
                          </Col>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.color}
                              name="vehicleColor"
                              size="large"
                              label="Color"
                              placeholder="Enter Color"
                              onChange={(e) => HandleVehicleOnChange(e)}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.license}
                              name="vehicleLicensePlate"
                              size="large"
                              label="License Plate"
                              placeholder="Enter License Plate"
                              onChange={(e) => HandleVehicleOnChange(e)}
                            />
                          </Col>
                          <Col span={12}>
                            d
                            <SelectBox
                              options={newStates}
                              rules={validationRules.state}
                              name="vehicleState"
                              size="large"
                              label="State"
                              placeholder="Enter State"
                              onChange={(e) => HandleVehicleOnChange(e)}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.spot}
                              name="vehicleSpot"
                              size="large"
                              label="Spot / Garage"
                              placeholder="Enter Spot / Garage"
                              onChange={(e) => HandleVehicleOnChange(e)}
                            />
                          </Col>
                        </Row>
                        <Button
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
                          Submit
                        </Button>
                      </Form>
                    )}
                  </Modal>
                  {/* <DynamicTable columns={vehicleColumns} data={vehicleData} /> */}
                  <div
                    className="table-responsive"
                    style={{ overflowX: "auto", maxWidth: "100%" }}
                  >
                    <table className="table table-striped">
                      <thead className="thead-dark">
                        <tr
                          style={{ fontSize: "15px", fontWeight: "600" }}
                          className="text-center align-middle"
                        >
                          <td>Year</td>
                          <td>Make</td>
                          <td>Model</td>
                          <td>Color</td>
                          <td>License</td>
                          <td>State</td>
                          <td>Spot</td>
                        </tr>
                      </thead>
                      <tbody>
                        {vehicleData && vehicleData.length > 0 ? (
                          vehicleData.map((vehicle, index) => (
                            <React.Fragment key={index}>
                              <tr className="text-center align-middle">
                                <td>{vehicle.Year}</td>
                                <td>{vehicle.Make}</td>
                                <td>{vehicle.Model}</td>
                                <td>{vehicle.Color}</td>
                                <td>{vehicle.License}</td>
                                <td>{vehicle.State}</td>
                                <td>{vehicle.Spot}</td>
                              </tr>
                            </React.Fragment>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="10"
                              className="text-center align-middle"
                              style={{ height: "100px" }}
                            >
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
                <section>
                  <p
                    className="text-center"
                    style={{
                      color: "#5A7890",
                      fontSize: "22px",
                      marginBottom: "2rem",
                      marginTop: "3rem",
                      fontWeight: "bold",
                    }}
                  >
                    Pets Info
                  </p>
                  <Button
                    style={{
                      borderRadius: 19,
                      border: "1px solid #5A7890",
                      color: "#5A7890",
                      backgroundColor: "#fff",
                      height: "2.5rem",
                      width: "8rem",
                      marginBottom: "2rem",
                    }}
                    onClick={showPetModal}
                  >
                    Add Pet
                  </Button>
                  <Modal
                    title="Add Pet"
                    centered
                    footer=""
                    open={isPetModalVisible}
                    Ok={handlePetFormSubmit}
                    Cancel={handlePetCancel}
                    width={900} // Adjust width as per your design
                  >
                    {(pageName) => (
                      <Form form={petForm} onFinish={handlePetFormSubmit}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.name}
                              name="petName"
                              size="large"
                              label="Name"
                              placeholder="Enter Name"
                              onChange={(e) => HandlePetOnChange(e)}
                            />
                          </Col>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.type}
                              name="petType"
                              size="large"
                              label="Type"
                              placeholder="Enter Type"
                              onChange={(e) => HandlePetOnChange(e)}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.breed}
                              name="petBreed"
                              size="large"
                              label="Breed"
                              placeholder="Enter Breed"
                              onChange={(e) => HandlePetOnChange(e)}
                            />
                          </Col>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.date}
                              name="petDueDate"
                              size="large"
                              label="Rabies Due Date"
                              placeholder="Enter Due Date"
                              onChange={(e) => HandlePetOnChange(e)}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.license}
                              name="petLicense"
                              size="large"
                              label="License#"
                              placeholder="Enter License"
                              onChange={(e) => HandlePetOnChange(e)}
                            />
                          </Col>
                          <Col span={12}>
                            <TextInput
                              rules={validationRules.age}
                              name="petAge"
                              size="large"
                              label="Age"
                              placeholder="Enter Age"
                              onChange={(e) => HandlePetOnChange(e)}
                            />
                          </Col>
                          <Button
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
                            Submit
                          </Button>
                        </Row>
                      </Form>
                    )}
                  </Modal>
                  {/* <DynamicTable columns={petColumns} data={petData} /> */}
                  <div
                    className="table-responsive"
                    style={{ overflowX: "auto", maxWidth: "100%" }}
                  >
                    <table className="table table-striped">
                      <thead className="thead-dark">
                        <tr
                          style={{ fontSize: "15px", fontWeight: "600" }}
                          className="text-center align-middle"
                        >
                          <td>Name</td>
                          <td>Type</td>
                          <td>Breed</td>
                          <td>Rabies Due Date</td>
                          <td>License</td>
                          <td>Age</td>
                        </tr>
                      </thead>
                      <tbody>
                        {petData && petData.length > 0 ? (
                          petData.map((pet, index) => (
                            <React.Fragment key={index}>
                              <tr className="text-center align-middle">
                                <td>{pet.Name}</td>
                                <td>{pet.Type}</td>
                                <td>{pet.Breed}</td>
                                <td>{pet.RabiesDueDate}</td>
                                <td>{pet.License}</td>
                                <td>{pet.Age}</td>
                              </tr>
                            </React.Fragment>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="10"
                              className="text-center align-middle"
                              style={{ height: "100px" }}
                            >
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
                <section>
                  <p
                    className="text-center"
                    style={{
                      color: "#5A7890",
                      fontSize: "22px",
                      marginBottom: "2rem",
                      marginTop: "3rem",
                      fontWeight: "bold",
                    }}
                  >
                    Lease Info
                  </p>
                  <Radio
                    label="Choose one."
                    rules={validationRules.newOrRenew}
                    name="newOrRenew"
                    options={options}
                  />
                  <Row gutter={16}>
                    <Col span={12}>
                      <TextInput
                        rules={validationRules.date}
                        name="startDay"
                        size="large"
                        label="Start Date"
                        placeholder="Enter Start Date"
                        onChange={(e) => HandlePetOnChange(e)}
                      />
                    </Col>
                    <Col span={12}>
                      <TextInput
                        rules={validationRules.date}
                        name="endDay"
                        size="large"
                        label="End Date"
                        placeholder="Enter End Date"
                        onChange={(e) => HandlePetOnChange(e)}
                      />
                    </Col>
                  </Row>
                </section>
                <p
                  className="text-center"
                  style={{
                    color: "#5A7890",
                    fontSize: "22px",
                    marginBottom: "2rem",
                    marginTop: "3rem",
                    fontWeight: "bold",
                  }}
                >
                  Supporting Documents
                </p>
                <UploadButton
                  handlePreview={handlePreview}
                  fileList={fileList}
                  setFileList={setFileList}
                  setPreviewImage={setPreviewImage}
                  previewImages={previewImage}
                  setPreviewOpen={setPreviewOpen}
                  previewOpen={previewOpen}
                  name="files"
                  handleChange={handleChange}
                  number={10}
                />

                {fee && (
                  <>
                    <section>
                      <p
                        className="text-center"
                        style={{
                          color: "#5A7890",
                          fontSize: "22px",
                          marginBottom: "3.5rem",
                          marginTop: "3rem",
                          fontWeight: "bold",
                        }}
                      >
                        Make A Payment
                      </p>
                      <div style={{ fontSize: "18px", marginBottom: "2.5rem" }}>
                        <b>Note : </b>The selected property will charge an
                        additional fees of <strong>{fee}</strong>.
                      </div>
                      <Row gutter={16}>
                        <Col span={12}>
                          <TextInput
                            rules={validationRules.cardNumber}
                            name="cardNumber"
                            size="large"
                            label="Credit Card Number"
                            placeholder="Enter Card Number"
                            onChange={(e) => HandlePetOnChange(e)}
                          />
                        </Col>
                        <Col span={12}>
                          <TextInput
                            rules={validationRules.cvv}
                            name="cvv"
                            size="large"
                            label="CVV"
                            placeholder="Enter CVV"
                            onChange={(e) => HandlePetOnChange(e)}
                          />
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <TextInput
                            rules={validationRules.cardExpiry}
                            name="cardExpiry"
                            size="large"
                            label="Expiry Date"
                            placeholder="Enter Expiry Date"
                            onChange={(e) => HandlePetOnChange(e)}
                          />
                        </Col>
                        <Col span={12}>
                          <TextInput
                            rules={validationRules.cardHolderName}
                            name="cardHolderName"
                            size="large"
                            label="Card Holder Name"
                            placeholder="Enter Card Holder Name"
                            onChange={(e) => HandlePetOnChange(e)}
                          />
                        </Col>
                      </Row>
                    </section>
                  </>
                )}
              </>
            )}
            {stateDisclaimer && (
              <div
                style={{
                  fontSize: "18px",
                  marginTop: "3rem",
                  marginBottom: "2rem",
                  border: "1px solid #5A7890",
                  paddingLeft: "20px",
                  paddingTop: "8px",
                  paddingRight: "20px",
                }}
              >
                <p style={{ fontSize: "18px", color: "#5A7890" }}>
                  <b>State Disclaimers</b>
                </p>
                <div
                  style={{ fontSize: "16px" }}
                  dangerouslySetInnerHTML={{ __html: stateDisclaimer }}
                />
              </div>
            )}
            {propertyDisclaimer && (
              <div
                style={{
                  fontSize: "18px",
                  marginBottom: "2rem",
                  border: "1px solid #5A7890",
                  paddingLeft: "20px",
                  paddingTop: "8px",
                  paddingRight: "20px",
                }}
              >
                <p style={{ fontSize: "18px", color: "#5A7890" }}>
                  <b>Property Disclaimers</b>
                </p>
                <div
                  style={{ fontSize: "16px" }}
                  dangerouslySetInnerHTML={{ __html: propertyDisclaimer }}
                />
              </div>
            )}

            <Button
              onClick={handleClearButton}
              style={{
                borderRadius: 19,
                border: "1px solid #5A7890",
                color: "#5A7890",
                backgroundColor: "#fff",
                height: "2.5rem",
                width: "8rem",
              }}
            >
              Clear
            </Button>
            <Button
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
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Tenant;
