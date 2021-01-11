const Assignment = require("../../../models/assignments_model");
const User = require("../../../models/users_model");
module.exports.create = async function (req, res) {
  try {
    req.body["createdBy"] = req.user.id;
    console.log("body", req.body);
    let assignments = await Assignment.create(req.body);

    return res.json(200, {
      message: "assignment created succesfully",
      data: assignments,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports.getAssignment = async function (req, res) {
  try {
    let assignments = await Assignment.find({});

    return res.json(200, {
      message: "assignment found succesfully",
      data: assignments,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports.evaluateAssignment = async function (req, res) {
  try {
    let assignment = await Assignment.findById(req.query.id);
    console.log("assignemnt", assignment);
    if (assignment.evaluated)
      return res.json(421, { msg: "Project is Already Evaluated" });
    if (assignment) {
      let grade = req.body.grade;

      assignment.Grade = grade;
      assignment.evaluated = true;
      assignment.save();

      let student = await User.findById(assignment.submittedBy);
      student.assignments.push(assignment);
      student.save();

      return res.json(200, {
        message: "assignment evaluated succesfully",
        data: assignment,
        student: student,
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports.submitAssignment = async function (req, res) {
  try {
    let assignment = await Assignment.findById(req.query.id);
    console.log("assignment", assignment, req.query.id);
    if (Date.now() > assignment.Deadline) {
      return res.status(422).json({
        message: "date to submitt assignemnt is passed",
      });
    }

    assignment.submittedBy = req.user.id;
    assignment.save();
    let teacher = await User.findById(assignment.createdBy);
    teacher.assignments.push(assignment);

    teacher.save();

    let student = await User.findById(req.user.id);
    student.assignments.push(assignment);

    return res.json(200, {
      message: "assignment found succesfully",
      data: assignment,
      teacher: teacher,
      student: student,
    });
  } catch (err) {
    console.log("error in submitting ", err);
    res.status(500).json({ message: "Internal server error", err });
  }
};
