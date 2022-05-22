const bcryptjs = require("bcryptjs");
const Student = require("../model/StudentAccountModel");
const { registerValidation } = require("../validations/studentValidation");

const addStudent = async (req, res) => {
    // checking whether is this a student or admin
    const validateStudent = localStorage.getItem("isStudent");
    const validateAdmin = localStorage.getItem("isAdmin");

    if (validateStudent === "true" || validateAdmin === "true") {
        // validate user input fields
        const { error } = registerValidation(req.body.data);
        if (error) {
            res.send({ message: error["details"][0]["message"] });
        }

        console.log(req.body.data);

        // to check user already exist
        const userExist = await Student.findOne({
            email: req.body.data.email,
        });
        if (userExist) {
            return res.status(400).send({ message: "User Already Exist" });
        }

        console.log("OK");

        //hash the password
        const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(
            req.body.data.password,
            salt,
        );

        const student = new Student({
            firstName: req.body.data.firstName,
            lastName: req.body.data.lastName,
            birthday: req.body.data.birthday,
            NIC: req.body.data.NIC,
            phoneNumber: req.body.data.phoneNumber,
            email: req.body.data.email,
            school: req.body.data.school,
            grade: req.body.data.grade,
            medium: req.body.data.medium,
            parentName: req.body.data.parentName,
            parentPhoneNumber: req.body.data.parentPhoneNumber,
            parentEmail: req.body.data.parentEmail,
            studentGender: req.body.data.studentGender,
            parentAddress: req.body.data.parentAddress,
            parentOccupation: req.body.data.parentOccupation,
            imageURL: req.body.data.imageURL,
            subject: req.body.data.subject,
            teacher: req.body.data.teacher,
            OL_Year: req.body.data.OL_Year,
            AL_Year: req.body.data.AL_Year,
            username: req.body.data.username,
            password: hashPassword,
        });

        console.log(student);

        try {
            console.log("SUCCESS");
            const savedStudent = student.save();
            res.send(savedStudent);
        } catch (error) {
            res.status(400).send({ message: error });
        }
    } else {
        return res
            .status(403)
            .json("You do not have permission to access this");
    }
};

const getStudents = async (req, res) => {
    // checking whether is this a student or admin
    const validateStudent = localStorage.getItem("isStudent");
    const validateAdmin = localStorage.getItem("isAdmin");

    if (validateStudent === "true" || validateAdmin === "true") {
        try {
            const students = await Student.find();
            res.send(students);
        } catch (error) {
            res.status(400).send({ message: error });
        }
    } else {
        return res
            .status(403)
            .json("You do not have permission to access this");
    }
};

const updateStudent = async (req, res) => {
    // checking whether is this a student or admin
    const validateStudent = localStorage.getItem("isStudent");
    const validateAdmin = localStorage.getItem("isAdmin");

    if (validateStudent === "true" || validateAdmin === "true") {
        const studentID = req.params.id;

        try {
            const student = await Student.findById(studentID);
            if (!student) {
                res.status(404).json("No Student Found");
            }

            const {
                firstName,
                lastName,
                birthday,
                NIC,
                phoneNumber,
                email,
                school,
                grade,
                medium,
                parentName,
                parentPhoneNumber,
                parentEmail,
                studentGender,
                parentAddress,
                parentOccupation,
                imageURL,
                subject,
                teacher,
                OL_Year,
                AL_Year,
                username,
                password,
            } = req.body.data;

            const updatedStudent = await Student.findByIdAndUpdate(
                studentID,
                {
                    firstName,
                    lastName,
                    birthday,
                    NIC,
                    phoneNumber,
                    email,
                    school,
                    grade,
                    medium,
                    parentName,
                    parentPhoneNumber,
                    parentEmail,
                    studentGender,
                    parentAddress,
                    parentOccupation,
                    imageURL,
                    subject,
                    teacher,
                    OL_Year,
                    AL_Year,
                    username,
                    password,
                },
            );

            res.status(200).json(updatedStudent);
        } catch (err) {
            res.status(400).send({ message: err });
        }
    } else {
        return res
            .status(403)
            .json("You do not have permission to access this");
    }
};

const deleteStudent = async (req, res) => {
    // checking whether is this a student or admin
    const validateStudent = localStorage.getItem("isStudent");
    const validateAdmin = localStorage.getItem("isAdmin");

    if (validateStudent === "true" || validateAdmin === "true") {
        const studentID = req.params.id;

        try {
            const student = await Student.findById(studentID);

            if (!student) {
                res.status(404).json("Student Not Found");
            }

            const deletedStudent = await Student.findByIdAndDelete(
                studentID,
            );
            res.status(200).json(deletedStudent);
        } catch (err) {
            res.status(400).json(err.message);
        }
    } else {
        return res
            .status(403)
            .json("You do not have permission to access this");
    }
};

const getOneStudent = async (req, res) => {
    // checking whether is this a student or admin
    const validateStudent = localStorage.getItem("isStudent");
    // const validateAdmin = localStorage.getItem("isAdmin");
    // || validateAdmin === "true"

    console.log("Validation: " + validateStudent);

    if (validateStudent.toString() === "true") {
        try {
            const student = await Student.findOne({ _id: req.params.id });

            if (!student) {
                res.status(404).json("Student Not Found");
            }
            res.status(200).json(student);
        } catch (err) {
            res.status(400).json(err.message);
        }
    } else {
        return res
            .status(403)
            .json("You do not have permission to access this");
    }
};

module.exports = {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getOneStudent,
};
