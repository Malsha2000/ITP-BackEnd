const Joi = require("joi");

const registerValidation = (data) => {
    const SchemaValidation = Joi.object({
        examName : Joi.string().required(),
        description : Joi.string().required(),
        subject : Joi.string().required(),
        grade : Joi.string().required(),
        teacherName : Joi.string().required(),
        date : Joi.date().required(),
        time : Joi.string().required(),
        duration : Joi.string().required(),
    });

    return SchemaValidation.validate(data);
};

module.exports.registerValidation = registerValidation;