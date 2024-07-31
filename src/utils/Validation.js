import Rules from "./Rules";
class Validation {
static getValidation = (fields) => {
    const rules = {};
    fields.forEach(field => {
      rules[field] = Rules?.rules[field]  || [];
    });
    return rules;
  };
}
export default Validation;
