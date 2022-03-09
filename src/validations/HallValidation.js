const Joi = require("joi");

const HallValidation = (data) => {

    const SchemaValidation = Joi.object({

       hallnumber : Joi.string().required(),
       floornumber : Joi.number().required(),
       capacity : Joi.number().required(),
       AC : Joi.boolean().required(),

    });

    return SchemaValidation.validate(data);

};

module.exports.HallValidation = HallValidation;