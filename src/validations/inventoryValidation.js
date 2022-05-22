const Joi = require("joi");

//registration validation
const inventoryValidation = (data) => {

    const SchemaValidation = Joi.object({

        itemName: Joi.string().required(),
        boughtDate: Joi.string().required(),
        
        quantity: Joi.number().required(),
        price: Joi.number().required(),

    });

    return SchemaValidation.validate(data);
    
}


module.exports.inventoryValidation = inventoryValidation; //export functions