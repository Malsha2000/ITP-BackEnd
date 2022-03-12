const bcryptjs = require("bcryptjs");
const Admin = require("../model/SystemAdminModel");
const { registerValidation} = require("../validations/adminValidation");

const addAdmin = async (req,res) => {

    //validate the user input feilds
    const {error} = registerValidation(req.body);
    if(error) {
        res.send({message:error['details'][0]['message']});
    }

    //to check user already exist
    const userExist = await Admin.findOne({email:req.body.email});
    if(userExist) {
        return res.status(400).send({message: "User alredy exist"})
    }

    //hash the password
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const admin = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        NIC: req.body.NIC,
        username: req.body.username,
        password: hashPassword,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
    });

    try {
        const savedAdmin = admin.save();
        res.send(savedAdmin);
    }
    catch(error) {
        res.status(400).send({message:error});
    }
};
    
    const getAdmins = async (req,res) => {
        try{
        const admins = await Admin.find();
        res.send(admins);
    }
    catch(error){
        res.status(400).send({message: error});
    }
}

module.exports = {
    addAdmin,
    getAdmins,
}