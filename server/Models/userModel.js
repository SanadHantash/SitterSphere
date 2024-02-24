const db = require("../config");
const jwt = require("jsonwebtoken");

const User = {};

User.checkUserExistence = async (email, user_name, phonenumber) => {
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
User.register = async (
  first_name,
  last_name,
  user_name,
  email,
  hashPassword,
  phonenumber
) => {
  try {
    const result = await db.query(
      "INSERT INTO users(first_name,last_name,user_name, email, password, phonenumber,role_id) VALUES($1, $2, $3, $4, $5, $6,2) RETURNING *",
      [first_name, last_name, user_name, email, hashPassword, phonenumber]
    );

  
    const userRole = await db.query(
      "SELECT role FROM roles WHERE id = $1",
      [result.rows[0].role_id]
    );

    
    result.rows[0].role = userRole.rows[0].role;

    return result.rows[0];
  } catch (err) {
    throw err;
  }
};


User.login = async (email) => {
  try {
    const user = await db.query(
      "SELECT users.id, email,user_name,password, roles.role  FROM users inner join roles on roles.id = users.role_id WHERE email = $1 And users.is_deleted= false;",
      [email]
    );
    if (user.rows[0]) {
      return user.rows[0];
    } else {
      return "Email not found or user is deleted.";
    }
  } catch (error) {
    throw error;
  }
};

User.checkconfirm = async (userID) => {
  try {
    const result = await db.query(
      "UPDATE users SET role_id = 1 WHERE id = $1 RETURNING *",
      [userID]
    );
    return result[0];
  } catch (err) {
    throw err;
  }
};

User.createUsersGoogle = async (
  first_name,
  last_name,
  username,
  email,
  picture
) => {
  const password = "By Google";
  const query = `INSERT INTO users (first_name,last_name,user_name,email,password,image) VALUES ($1, $2, $3, $4, $5,$6)
  RETURNING *`;

  const values = [first_name, last_name, username, email, password, picture];
  const user = await db.query(query, values);
  return user.rows[0];
};

User.login = async (email) => {
  try {
    const user = await db.query(
      "SELECT users.id, email,user_name,password, roles.role  FROM users inner join roles on roles.id = users.role_id WHERE email = $1 And users.is_deleted= false;",
      [email]
    );
    if (user.rows[0]) {
      return user.rows[0];
    } else {
      return "Email not found or user is deleted.";
    }
  } catch (error) {
    throw error;
  }
};

User.findByEmail = async (email) => {
  const result = await db.query("SELECT users.id, email,user_name,password, roles.role  FROM users inner join roles on roles.id = users.role_id WHERE email = $1 And users.is_deleted= false;", [
    email,
  ]);
  return result.rows[0];
};

User.findbyid = async (userID) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [
      userID,
    ]);
    return result[0];
  } catch (err) {
    throw err;
  }
};



User.storecode = async (email,code) =>{
  try{
        const result = await db.query('insert into codes (email,code) values ($1,$2)',[email,code])
        return result.rows
  }catch (err) {
  throw err;
}
}


User.getcode = async (code) => {
try {
    const result = await db.query('SELECT id, code, email FROM codes WHERE code = $1', [code]);
    return result.rows[0]; 
} catch (err) {
    throw err;
}
};


User.forgetpassemail= async (email) => {
  try {
      const result = await db.query('SELECT id, code, email FROM codes WHERE email = $1', [email]);
      return result.rows[0]; 
  } catch (err) {
      throw err;
  }
};


User.resetpassword = async (email, hashedPassword) => {
try {
const result = await db.query('UPDATE users SET password = $2 WHERE email = $1 RETURNING *', [email, hashedPassword]);

if (result.rows.length === 0) {
  throw new Error('User not found or password not updated');
}
} catch (err) {
throw err;
}
};


User.clearcode = async (email) => {
  try {
    const result = await db.query('delete from codes where email = $1', [email]);
    return result.rows[0]; 
} catch (err) {
    throw err;
}
}


module.exports = User;
