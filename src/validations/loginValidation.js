const Joi = require("joi");

const loginValidation = (data) => {
    const schemaValidation = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),    
    });

    return schemaValidation.validate(data);
}

module.exports.loginValidation = loginValidation;