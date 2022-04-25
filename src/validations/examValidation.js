const Joi = require("joi");

const registerValidation = (data) => {
    const SchemaValidation = Joi.object({
        examName : Joi.string().required(),
        description : Joi.string().required(),
        date : Joi.date().required(),
        time : Joi.string().required(),
        duration : Joi.string().required(),
    });

    return SchemaValidation.validate(data);
};

module.exports.registerValidation = registerValidation;