import ValidationMessage from "./ValidationConstants";
class Rules {
  static rules = {
    state: [{ required: true, message: ValidationMessage.checkRequired }],
    city: [{ required: true, message: ValidationMessage.checkRequired }],
    communities: [{ required: true, message: ValidationMessage.checkRequired }],
    firstName: [{ required: true, message: ValidationMessage.checkRequired },{ 
      max: 100, 
      message: ValidationMessage.checkLength
    }],
    lastName: [{ required: true, message: ValidationMessage.checkRequired },{ 
      max: 100, 
      message: ValidationMessage.checkLength
    }],
    address: [{ required: true, message: ValidationMessage.checkRequired },{ 
      max: 150, 
      message: ValidationMessage.checkLength
    }],
    cityName: [{ required: true, message: ValidationMessage.checkRequired },{ 
      max: 100, 
      message: ValidationMessage.checkLength
    }],
    stateName: [{ required: true, message: ValidationMessage.checkRequired },{ 
      max: 100, 
      message: ValidationMessage.checkLength
    }],
    zip: [{ required: true, message: ValidationMessage.checkRequired },{ 
      max: 10, 
      message: ValidationMessage.checkLength
    }],
    phone: [{ required: true, message: ValidationMessage.checkRequired},{
      pattern: /^\d{10}$/, 
      message: ValidationMessage.checkValidPhone 
    }],
    email: [{ required: true, message: ValidationMessage.checkRequired },
      { 
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
      message: ValidationMessage.checkValidEmail 
    },{ 
      max: 150, 
      message: ValidationMessage.checkLength
    }],
    residentKey: [{ required: true, message: ValidationMessage.checkRequired }],
    maintenanceLocation: [{ required: true, message: ValidationMessage.checkRequired },{ 
      max: 1000, 
      message: ValidationMessage.checkLength
    }],
    maintenanceConcern: [{ required: true, message: ValidationMessage.checkRequired },{ 
      max: 5000, 
      message: ValidationMessage.checkLength
    }],
    files: [{ required: true, message: ValidationMessage.checkRequired },{ 
      max: 1500, 
      message: ValidationMessage.checkLength
    }],
    editorContent: [{ required: true, message: ValidationMessage.checkRequired }],
    radio: [{ required: true, message: ValidationMessage.checkRequired }],
  };
}
export default Rules;
