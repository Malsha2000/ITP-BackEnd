const Joi = require("joi");

const resultValidation = (data) => {
    const schemaValidation = Joi.object({
        examName: Joi.string().required(),
        studentName: Joi.string().required(),
        studentId: Joi.string().required(),
        marks: Joi.number().required(),
        subject: Joi.string().required(),
        grade: Joi.string().required(),
    
    });

    return schemaValidation.validate(data);
}

module.exports.resultValidation = resultValidation;