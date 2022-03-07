const Joi = require("joi");

//registration validation
const registerValidation = (data) => {

    const SchemaValidation = Joi.object({

        itemName: Joi.string().required(),
        boughtDate: Joi.string().required(),
        imageUrl: Joi.string().required(),
        price: Joi.number().required(),

    });

    return SchemaValidation.validate(data);
    
}


module.exports.registerValidation = registerValidation; //export functions