const joi = require("joi");

//tutorial validation
const tutorialValidation = (data) =>{

    const schemaValidation = joi.object({

        tutorialName: joi.string().required(),
        subject: joi.string().required(),
        grade: joi.string().required(),
        teacherName: joi.string().required(),
        lessonName: joi.string().required(),
        link: joi.string().required(),
    });

    return schemaValidation.validate(data);
}


module.exports.tutorialValidation = tutorialValidation; //export functons