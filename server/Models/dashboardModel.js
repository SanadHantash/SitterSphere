const db = require("../config");
const jwt = require("jsonwebtoken");
const { admin, storage } = require("../firebase");
const Dashboard = {};


Dashboard.checkSitterExistence = async (email, user_name, phonenumber) => {
    const checkEmail = await db.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);
    const checkUsername = await db.query(
      "SELECT * FROM users WHERE user_name = $1;",
      [user_name]
    );
    const checkPhone = await db.query(
      "SELECT * FROM users WHERE phonenumber = $1;",
      [phonenumber]
    );
  
    if (checkEmail.rows.length > 0) {
      throw new Error("invalid email");
    }
    if (checkUsername.rows.length > 0) {
      throw new Error("invalid username");
    }
    if (checkPhone.rows.length > 0) {
      throw new Error("invalid phonenumber");
    }
  
    return true;
  };


Dashboard.addbabysitter = async (
    first_name,
    last_name,
    user_name,
    email,
    phonenumber,
    imageUrl,
    hashedPassword
  ) => {
    const result = await db.query(
      "INSERT INTO users (first_name,last_name,user_name,email,phonenumber,image,role_id,password)  VALUES ($1, $2, $3,$4,$5,$6,3,$7)",
      [
        first_name,
        last_name,
        user_name,
        email,
        phonenumber,
        imageUrl,
        hashedPassword
      ]
    );
    return result.rows;
  };

module.exports = Dashboard;
