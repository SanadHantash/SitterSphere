const Dashboard = require("../Models/dashboardmodel.js");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { admin } = require("../firebase");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");
const Joi = require("joi");

const addbabysitter = async (req, res) => {
  
    // const { role } = req.user;

    // if (role !== 'admin') {
    //   return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    // }

    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const {
        first_name,
        last_name,
        user_name,
        email,
        phonenumber,
      } = req.body;

      const schema = Joi.object({
        first_name: Joi.string().alphanum().min(3).max(10).required(),
        last_name: Joi.string().alphanum().min(3).max(10).required(),
        user_name: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string()
          .required()
          .email({ tlds: { allow: false } })
          .custom((value, helpers) => {
            if (!value.endsWith("@gmail.com")) {
              return helpers.error("any.custom", {
                message: "Email must be a Gmail address",
              });
            }
            return value;
          }),
        phonenumber: Joi.string()
          .pattern(/^(077|078|079)[0-9]{7}$/)
          .required()
          .messages({
            "string.pattern.base":
              "Invalid phone number format. Please enter a valid 10-digit phone number starting with 077, 078, or 079.",
          }),
      });


      const imageBuffer = req.file ? req.file.buffer : null;
      const imageUrl = await uploadImageToFirebase(imageBuffer);

      const defaultPassword = 'SitterSphere@2024';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      const { error } = schema.validate({
        first_name,
        last_name,
        user_name,
        email,
        phonenumber,
      });
    
      if (error) {
        return res.status(400).json({ success: false, error: error.message });
      }

      try {
        await Dashboard.checkSitterExistence(email, user_name, phonenumber);
        await Dashboard.addbabysitter(
            first_name,
            last_name,
            user_name,
            email,
            phonenumber,
            imageUrl,
            hashedPassword
        );
        res
          .status(201)
          .json({ success: true, message: "Sitter added successfully",  });
      } catch (err) {
        console.error(err);
        if (
          err.message === "invalid email" ||
          err.message === "invalid username" ||
          err.message === "invalid phonenumber"
        ) {
          res.status(400).json({ success: false, error: err.message });
        } else {
          res
            .status(500)
            .json({ success: false, error: "Sitter added failed" });
        }
      }

    });
  } 


const uploadImageToFirebase = async (imageBuffer) => {
    const bucket = admin.storage().bucket();
  
    const folderPath = "BabySitters/";
  
    const uniqueFilename = "image-" + Date.now() + ".png";
  
    const filePath = folderPath + uniqueFilename;
  
    const file = bucket.file(filePath);
  
    await file.createWriteStream().end(imageBuffer);
  
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
  
    return imageUrl;
  };

  
const allusers = async (req, res) => {
  try {
    // const {role} = req.user;
    // if (role !== 'admin') {
    //   return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    // }

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    //const roleFilter = req.query.role || "";
    const users = await Dashboard.allusers(page, pageSize);
    const totalCount = await Dashboard.countusers();
    const totalPages = Math.ceil(totalCount / pageSize);
    console.log(totalCount, totalPages);
    return res
      .status(200)
      .json({ succes: true, users, totalCount, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Dashboard.login(email);

    if (!user || !user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Email not found or user is denied to access." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const { id, role } = user;

    if (role !== "admin") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Access denied. Only admins are allowed.",
        });
    }

    const token = jwt.sign(
      { userId: id, email, role },
      process.env.SECRET_KEY,
      { expiresIn: "4h" }
    );
    res.cookie("token", token, { httpOnly: true });
    res
      .status(200)
      .json({ success: true, message: "Successfully signed in", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const countusers = async (req, res) => {
  try {
    // const {role} = req.user;
    // if (role !== 'admin') {
    //   return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    // }
    const count = await Dashboard.countusers();
    return res.status(200).json({ succes: true, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const allsitters = async (req, res) => {
  try {
    // const {role} = req.user;
    // if (role !== 'admin') {
    //   return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    // }

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    //const roleFilter = req.query.role || "";
    const sitters = await Dashboard.allsitters(page, pageSize);
    const totalCount = await Dashboard.countsitters();
    const totalPages = Math.ceil(totalCount / pageSize);
    console.log(totalCount, totalPages);
    return res
      .status(200)
      .json({ succes: true, sitters, totalCount, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const countsitters = async (req, res) => {
  try {
    // const {role} = req.user;
    // if (role !== 'admin') {
    //   return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    // }
    const count = await Dashboard.countsitters();
    return res.status(200).json({ succes: true, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
    addbabysitter,
    allusers,
    login,
    countusers,
    allsitters,
    countsitters
}