const Event = require("../model/EventModel");
const { eventValidation } = require("../validations/eventValidation");

//user ragistration function
const addEvent = async (req, res) => {
  const validate = localStorage.getItem("isAdmin");

  if (validate === "true") {
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
  } else {
    return res.status(403).json("You do not have permission to access this");
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

const updateEvent = async (req, res) => {
  const validate = localStorage.getItem("isAdmin");

  if (validate == "true") {
    const eventId = req.params.id;

    try {
      const event = await Event.findById(eventId);
      if (!event) {
        res.status(404).json("No Event Found");
      }

      const {
        eventName,
        eventDate,
        tags,
        description,
        time,
        Venue,
        imageUrl,
        registrationLink,
      } = req.body;
      const updatedEvent = await Event.findByIdAndUpdate(eventId, {
        eventName,
        eventDate,
        tags,
        description,
        time,
        Venue,
        imageUrl,
        registrationLink,
      });

      res.status(200).json(updatedEvent);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  } else {
    return res.status(403).json("You do not have permission to access this");
  }
};

const deleteEvent = async (req, res) => {
  const validate = localStorage.getItem("isAdmin");

  if (validate === "true") {
    const eventId = req.params.id;

    try {
      const event = await Event.findById(eventId);

      if (!event) {
        res.status(404).json("Event Not Found");
      }

      const deletedEvent = await Event.findByIdAndDelete(eventId);
      res.status(200).json(deletedEvent);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } else {
    return res.status(403).json("You do not have permission to access this");
  }
};

const getoneEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });

    if (!event) {
      res.status(404).json("Event Not Found");
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports = {
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getoneEvent,
}; //export functions
