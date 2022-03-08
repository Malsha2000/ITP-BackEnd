const Event = require("../model/EventModel");
const { eventValidation } = require("../validations/eventValidation");

//user ragistration function
const addEvent = async (req, res) => {
  //validate the user input fields
  const { error } = eventValidation(req.body);
  if (error) {
    res.send({ message: error["details"][0]["message"] });
  }

  //to check user already exist
  const eventExist = await Event.findOne({ eventName: req.body.eventName });
  if (eventExist) {
    return res.status(400).send({ message: "Event already exist" });
  }

  //assign data to the model
  const event = new Event({
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    tags: req.body.tags,
    description: req.body.description,
    time: req.body.time,
    Venue: req.body.Venue,
    imageUrl: req.body.imageUrl,
    registrationLink: req.body.registrationLink,
  });

  try {
    //save the data in the database
    const savedEvent = await event.save();
    res.send(savedEvent);
  } catch (error) {
    //error handling
    res.status(400).send({ message: error });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.find();
    res.send(event);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

module.exports = {
  addEvent,
  getEvent,
}; //export functions
