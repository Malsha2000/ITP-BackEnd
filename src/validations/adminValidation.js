const Joi = require("joi");

const registerValidation = (data) => {
    const SchemaValidation = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        NIC: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required().email(), 
        address: Joi.string().required(), 
    });

    return SchemaValidation.validate(data);
}

module.exports.registerValidation = registerValidation;
