const Timetable = require("../model/TimetableModels");
const { timetableValidation } = require("../validations/TimetableValidation");

//add timetable function
const addTimetable = async (req,res) => {
    
    //validate the timetable input fields
    const {error} = timetableValidation(req.body);
    if(error) {
        res.send({message:error['details'][0]['message']});
    }

    //to check timetable already exist
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

  const updateTimetable = async (req,res) => {

    const timetableId = req.params.id;

    try {
        const timetable = await Timetable.findById(timetableId);
        if(!timetable) {
            res.status(404).json("No Timetable Found");
        }

        const {subject, grade
            , teacherName
            ,hallNumber, date, time, classType, medium, floorNumber} = req.body;
        const updatedTimetable = await Timetable.findByIdAndUpdate(timetableId, {subject, grade
            , teacherName
            ,hallNumber, date, time, classType, medium, floorNumber});

        res.status(200).json(updatedTimetable);
    }
    catch(err) {
        res.status(400).send({message: err});
    }
};

const deleteTimetable = async (req,res) => {
    const timetableId = req.params.id;

    try {
        const timetable = await Timetable.findById(timetableId);

        if(!timetable) {
            res.status(404).json("Timetable Not Found");
        }

        const deletedTimetable = await Timetable.findByIdAndDelete(timetableId);
        res.status(200).json("Timwtable Deleted");
    }
    catch(err) {
        res.status(400).json(err.message);
    }
};

module.exports = {
    addTimetable,
    getTimetable,
    updateTimetable,
    deleteTimetable,
}; //export functions