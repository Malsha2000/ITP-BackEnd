const Joi = require("joi");

const registerValidation = (data) => {
    const SchemaValidation = Joi.object({
        IDNumber: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required().email(),
    });

    return SchemaValidation.validate(data);
}

module.exports.registerValidation = registerValidation;