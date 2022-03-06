const joi = require("joi");

//registration validation
const registerValidation = (data) => {

    const schemaValidation = joi.object({

        eventName: joi.string().required(),
        eventDate: joi.string().required(),
        tags: joi.string().required(),
        description: joi.string().required(),
        time: joi.string().required(),
        Venue: joi.string().required(),
        imageUrl: joi.string().required(),
        registrationLink: joi.string().required(),

    });

    return schemaValidation.validate(data);
    
}


module.exports.registerValidation = registerValidation; //export functions