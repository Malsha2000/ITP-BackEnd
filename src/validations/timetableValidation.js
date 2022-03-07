const Joi = require("joi");

//registration validation
const registerValidation = (data) => {

    const SchemaValidation = Joi.object({

        subject: Joi.string().required(),
        grade: Joi.string().required(),
        teacherName: Joi.string().required(),
        hallNumber: Joi.string().required(),
        date: Joi.string().required(),
        time: Joi.string().required(),
        classType: Joi.string().required(),
        medium: Joi.string().required(),
        floorNumber: Joi.number().required(),

    });

    return SchemaValidation.validate(data);
    
}


module.exports.registerValidation = registerValidation; //export functions