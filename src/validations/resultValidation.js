const Joi = require("joi");

const resultValidation = (data) => {
    const schemaValidation = Joi.object({
        examName: Joi.string().required(),
        studentName: Joi.string().required(),
        studentId: Joi.string().required(),
        marks: Joi.number().required(),    
    });

    return schemaValidation.validate(data);
}

module.exports.resultValidation = resultValidation;