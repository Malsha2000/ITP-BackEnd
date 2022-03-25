const Request = require("../model/requestModel");
const { requestValidation } = require("../validations/requestValidation");


//user ragistration function
const addRequest = async (req, res) => {
    //validate the user input fields
    const { error } = requestValidation(req.body);
    if (error) {
      res.send({ message: error["details"][0]["message"] });
    }
  
    //to check user already exist
    const requestExist = await Request.findOne({ requestTitle: req.body.requestTitle });
    if (requestExist) {
      return res.status(400).send({ message: "Requst already exist" });
    }
  
    //assign data to the model
    const request = new Request({
        requestTitle: req.body.requestTitle,
        teacherName: req.body.teacherName,
        Date: req.body.Date,
        time: req.body.time,
        description: req.body.description,
    });
  
    try {
      //save the data in the database
      const savedRequest = await request.save();
      res.send(savedRequest);
    } catch (error) {
      //error handling
      res.status(400).send({ message: error });
    }
  };
  
  const getRequest = async (req, res) => {
    try {
      const request = await Request.find();
      res.send(request);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };
  
  const updateRequest = async (req, res) => {
    const requestId = req.params.id;
  
    try {
      const request = await Request.findById(requestId);
      if (!request) {
        res.status(404).json("No Request Found");
      }
  
      const {
        requestTitle,
        teacherName,
        Date,
        time,
        description,
    
      } = req.body;
      const updatedRequest = await Request.findByIdAndUpdate(requestId, {
        requestTitle,
        teacherName,
        Date,
        time,
        description,
      });
  
      res.status(200).json(updatedRequest);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  };
  
  const deleteRequest = async (req, res) => {
    const requestId = req.params.id;
  
    try {
      const request = await Request.findById(requestId);
  
      if (!request) {
        res.status(404).json("Request Not Found");
      }
  
      const deletedRequst = await Request.findByIdAndDelete(requestId);
      res.status(200).json(deletedRequst);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  
  
  const getoneRequest = async (req, res) => {
    try {
      const request = await Request.findOne({ _id: req.params.id });
  
      if (!request) {
        res.status(404).json("Request Not Found");
      }
      res.status(200).json(request);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  
  module.exports = {
    addRequest, 
    getRequest, 
    updateRequest, 
    deleteRequest,
    getoneRequest,
  }; //export functions
   