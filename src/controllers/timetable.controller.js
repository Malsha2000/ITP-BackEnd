const Timetable = require("../model/TimetableModels");
const { timetableValidation } = require("../validations/TimetableValidation");

//user ragistration function
const addTimetable = async (req,res) => {
    
    //validate the user input fields
    const {error} = timetableValidation(req.body);
    if(error) {
        res.send({message:error['details'][0]['message']});
    }

    //to check user already exist
    const timetableExist = await Timetable.findOne({subject: req.body.subject});
    if(timetableExist) {
        return res.status(400).send({message: "Subject already exist"});
    }

    //assign data to the model
    const timetable = new Timetable({
        subject: req.body.subject,
        grade: req.body.grade,
        teacherName: req.body.teacherName,
        hallNumber: req.body.hallNumber,
        date: req.body.date,
        time: req.body.time,
        classType: req.body.classType,
        medium: req.body.medium,
        floorNumber: req.body.floorNumber,
    });
    
    try {
        //save the data in the database
        const savedTimetable = await timetable.save();
        res.send(savedTimetable);
    }
    catch(error) { //error handling
        res.status(400).send({message:error});
    }

}

const getTimetable = async (req, res) => {
    try {
      const timetable = await Timetable.find();
      res.send(timetable);
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

module.exports = {
    addTimetable,
    getTimetable,
}; //export functions