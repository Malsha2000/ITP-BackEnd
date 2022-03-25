const joi = require("joi");

//registration validation
const requestValidation = (data) => {
  const schemaValidation = joi.object({
    requestTitle: joi.string().required(),
    teacherName: joi.string().required(),
    Date: joi.string().required(),
    time: joi.string().required(),
    description: joi.string().required(),
    
  });

  return schemaValidation.validate(data);
};

module.exports.requestValidation = requestValidation; //export functions
