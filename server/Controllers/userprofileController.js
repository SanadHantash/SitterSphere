const Profile = require("../Models/userprofileModel");
const User = require("../Models/userModel");
const multer = require("multer");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { admin } = require("../firebase");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

const userinfo = async (req, res) => {
  try {
    const userID = req.user.userId;


    const info = await Profile.userinfo(userID);

    res.status(200).json({ success: true, info });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Error in getting user info" });
  }
};

const profilepicture = async (req, res) => {
  try {
    const userID = req.user.userId;
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const imageBuffer = req.file ? req.file.buffer : null;

      const imageUrl = await uploadImageToFirebase(imageBuffer);

      await Profile.profilepicture(userID, imageUrl);
      res
        .status(201)
        .json({ success: true, message: "image added successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: "image added failed" });
  }
};

const uploadImageToFirebase = async (imageBuffer) => {
  const bucket = admin.storage().bucket();

  const folderPath = "profiles/";

  const uniqueFilename = "profile-" + Date.now() + ".png";

  const filePath = folderPath + uniqueFilename;

  const file = bucket.file(filePath);

  await file.createWriteStream().end(imageBuffer);

  const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

  return imageUrl;
};



const updateinfo = async (req, res) => {

  const userID = req.user.userId;

  const { first_name, last_name, user_name, email, phonenumber } = req.body;

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
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid phone number format. Please enter a 10-digit phone number.",
      }),
  });

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
    if (email || user_name || phonenumber) {
      await Profile.checkUserExistence(email, user_name, phonenumber);
    }

    await Profile.updateinfo(
      userID,
      first_name,
      last_name,
      user_name,
      email,
      phonenumber
    );

    res
      .status(201)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    if (
      err.message === "invalid email" ||
      err.message === "invalid username" ||
      err.message === "invalid phonenumber"
    ) {
      res.status(400).json({ success: false, error: err.message });
    } else {
      res.status(500).json({ success: false, error: "User updated failed" });
    }
  }
};

const updatepassword = async (req, res) => {
  
  try {
    
    const userID = req.user.userId;
    const email = req.user.email;
    const { oldpassword, newpassword } = req.body;

    const user = await User.login(email);

    if (!user || !user.password) {
      return res
        .status(401)
        .json({ success: false, error: "User or password not found." });
    }

    const isPasswordMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect old password." });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await Profile.updatepassword(userID, hashedPassword);

    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


module.exports = {
  userinfo,
  profilepicture,
  updateinfo,
  updatepassword
};
