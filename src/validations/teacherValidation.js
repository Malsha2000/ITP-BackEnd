const Joi = require("joi");

const registerValidation = (data) => {
    const SchemaValidation = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        NIC: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required().email(),
        higerQulification: Joi.string().required(),
        subject: Joi.string().required(),
        medium: Joi.string().required(),
        experienceYear: Joi.number().required(),
        classType: Joi.string().required(),
        imageUrl: Joi.string().required(),
    });

    return SchemaValidation.validate(data);
}

module.exports.registerValidation = registerValidation;