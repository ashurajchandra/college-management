const User = require("../../../models/users_model");

const jwt = require("jsonwebtoken");

module.exports.hello = function () {
  return "hello world";
};

//Register a user
module.exports.register = async function (req, res) {
  try {
    //check if email already exists

    //check if name exists

    //create new user
    const user = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role,
    });

    //return the info of the newly created user as json

    return res.status(201).send({
      success: true,
      message: "User signup successfully, new user creater",
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        },
      },
    });
  } catch (err) {
    console.log("error in registering ", err);
    res.status(400).send({ message: "error in registering", err });
  }
};

//Login a registered user using passport jwt authentication
module.exports.login = async function (req, res) {
  try {
    //check if user exists (using username)
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    //create and assign a token, and return the JWT as json
    const token = jwt.sign(user.toJSON(), "ashutosh");
    res.status(200).json({
      message: "signup successful,here is your token please keep it safe",
      success: true,

      data: {
        token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};
