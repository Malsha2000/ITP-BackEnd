const router = require("express").Router();
const{ validate , Teacher} = require("../modal/TeacherModel");
const bcrypt =require("bcrypt");

router.post("/", async (req,res) => {
try {
    const  {error} = validate( req.body);
    if(error){
        return res.status(400).send(
        {
            message: error.details[0].message
        }
        )};

        const teacher = await Teacher.findOne({
            email: req.body.email
        });
        if(teacher){
            return res.status(409).send({message: "User with given  email altredy exist!"});
        }
        const salt = await bcrypt.genSalt( Number( process.env.SALT));
        consthashPassword = await bcrypt.hash(req.body.password,salt);

        await new Teacher({...req.body,password:hashPassword}).save();
        res.status(201).send({message: "User Create Successful"});

}
catch(error){
    res.status(500).send({message: "Internal server error"});
}

});

module.exports = router;


