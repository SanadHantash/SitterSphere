const User = require("../Models/userModel");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const { admin } = require("../firebase");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

function cont(req, res) {
  res.status(200).json("you are in");
}

const register = async (req, res) => {

  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

  const { first_name, last_name, user_name, email, password, phonenumber,address } =
    req.body;

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
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!$%&])[a-zA-Z\d@#!$%&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Invalid password format. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one of @, #, !, $, %, or &.",
      }),
    phonenumber: Joi.string()
      .pattern(/^(077|078|079)[0-9]{7}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid phone number format. Please enter a valid 10-digit phone number starting with 077, 078, or 079.",
      }),
      address:Joi.string()
  });
      const imageBuffer = req.file ? req.file.buffer : null;
      const imageUrl = await uploadImageToFirebase(imageBuffer);

  const { error } = schema.validate({
    first_name,
    last_name,
    user_name,
    email,
    password,
    phonenumber,
    address
  });

  if (error) {
    return res.status(400).json({ success: false, error: error.message });
  }

  try {
    await User.checkUserExistence(email, user_name, phonenumber);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.register(
      first_name,
      last_name,
      user_name,
      email,
      hashedPassword,
      phonenumber,
      address,
      imageUrl
    );
    console.log(user);
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.user_name,
        role: user.role, 
      },
      process.env.SECRET_KEY,
      { expiresIn: "4h" }
    );
    res.cookie("token", token);
    console.log(token);
    res
      .status(201)
      .json({ success: true, message: "User added successfully", token, user });
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
        .json({ success: false, error: "User registration failed" });
    }
  }
})
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



const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email);

    if (!user || user.is_deleted || !user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    console.log(user.id);
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.user_name,
        email: user.email,
        role: user.role,
      },
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


const createCheckoutSession = async (req, res) => {
  try {
    const userID = req.user.userId;

    const checkoutObject = {
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1OhHB8JHXfBpbbMkpIc73EZo",
          quantity: 1,
        },
      ],
      mode: "subscription",
    };

    const customer = await stripe.customers.create({
      email: req.user.email,
      name: req.user.username,
      metadata: {
        userId: userID,
      },
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      success_url: "http://localhost:3000/successs",
      cancel_url: "http://localhost:3000/cancel",
      line_items: checkoutObject.line_items,
      mode: checkoutObject.mode,
      subscription_data: checkoutObject.subscription_data,
    });

    res.json({ id: session.id });
    await User.checkconfirm(userID);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Payment failed" });
  }
};


const updateuserrole = async (req, res) => {
  try {
   
    const userID = req.user.userId;
    await User.checkconfirm(userID);
    res.status(200).json({ success: true, message: "user updated success" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "User Role updated failed" });
  }
};

const forgetpassword = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sittersphere5@gmail.com",
      pass: "iyzcqvbtdczixtro",
    },
  });

  const { email } = req.body;
  const user = await User.login(email);

  if (!user || user.is_deleted || !user.email) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or user not found" });
  }

  const code = Math.floor(100000 + Math.random() * 900000);

  await User.storecode(email, code);

  await transporter.sendMail({
    from: "sittersphere5@gmail.com",
    to: [email],
    subject: "Password Reset",
    text: `Your password reset code is: ${code}`,
  });

  res.json({
    success: true,
    message: "Password reset email sent successfully",
  });
};

const verifycode = async (req, res) => {
  const { code } = req.body;

  try {
    const storedCode = await User.getcode(code);

    if (!storedCode) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired code" });
    }

    const email = storedCode.email;

    res.json({ success: true, message: "Code verification successful", email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const resetpassword = async (req, res) => {
  try {
    const schema = Joi.object({
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!$%&])[a-zA-Z\d@#!$%&]{8,}$/
        )
        .required()
        .messages({
          "string.pattern.base":
            "Invalid password format. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one of @, #, !, $, %, or &.",
        }),
    });

    const { error } = schema.validate({ password: req.body.password });
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    const { email, password } = req.body;

    const checkemail = await User.forgetpassemail(email);

    if (!checkemail) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.resetpassword(email, hashedPassword);
    await User.clearcode(email);
    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  cont,
  createCheckoutSession,
  forgetpassword,
  verifycode,
  resetpassword,
  updateuserrole,
};
