const TeacherRequest = require("../model/requestModel");
const { requestValidation } = require("../validations/requestValidation");


//user ragistration function
const addRequest = async (req, res) => {
    //validate the user input fields
    const { error } = requestValidation(req.body);
    if (error) {
      res.send({ message: error["details"][0]["message"] });
    }
  
    //to check user already exist
    const requestExist = await TeacherRequest.findOne({ requestTitle: req.body.requestTitle });
    if (requestExist) {
      return res.status(400).send({ message: "Requst already exist" });
    }
  
    //assign data to the model
    const teacherRequest = new TeacherRequest({
        requestTitle: req.body.requestTitle,
        teacherName: req.body.teacherName,
        Date: req.body.Date,
        time: req.body.time,
        description: req.body.description,
    });
  
    try {
      //save the data in the database
      const savedRequest = await teacherRequest.save();
      res.send(savedRequest);
    } catch (error) {
      //error handling
      res.status(400).send({ message: error });
    }
  };
  
  const getRequest = async (req, res) => {
    try {
      const request = await TeacherRequest.find();
      res.send(request);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };
  
  const updateRequest = async (req, res) => {
    const requestId = req.params.id;
  
    try {
      const request = await TeacherRequest.findById(requestId);
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
      const updatedRequest = await TeacherRequest.findByIdAndUpdate(requestId, {
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
      const request = await TeacherRequest.findById(requestId);
      if (!request) {
        res.status(404).json("Request Not Found");
      }
  
      const deletedRequest = await TeacherRequest.findByIdAndDelete(requestId);
      res.status(200).json(deletedRequest);
    } catch (err) {
      res.status(400).json(err.message);
    }
  };
  
  
  const getoneRequest = async (req, res) => {
    try {
      const request = await TeacherRequest.findOne({ _id: req.params.id });
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
   