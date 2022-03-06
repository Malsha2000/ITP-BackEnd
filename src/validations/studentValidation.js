const Joi = require("joi");

const registerValidation = (data) => {
  const SchemaValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthday: Joi.string().required(),
    NIC: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().required().email(),
    school: Joi.string().required(),
    grade: Joi.string().required(),
    medium: Joi.string().required(),
    parentName: Joi.string().required(),
    parentEmail: Joi.string().email(),
    parentPhoneNumber: Joi.string().required(),
    studentGender: Joi.string().required(),
    parentAddress: Joi.string().required(),
    parentOccupation: Joi.string().required(),
    imageURL: Joi.string().required(),
    subject: Joi.string().required(),
    teacher: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    OL_Year: Joi.string(),
    AL_Year: Joi.string(),
  });

  return SchemaValidation.validate(data);
};

module.exports.registerValidation = registerValidation;
