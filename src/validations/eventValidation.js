const joi = require("joi");

//registration validation
const eventValidation = (data) => {
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
};

module.exports.eventValidation = eventValidation; //export functions
