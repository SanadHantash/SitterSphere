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
      hashedPassword,
    ]
  );
  return result.rows;
};

Dashboard.allusers = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    let queryString = `SELECT users.id, users.first_name, users.last_name, users.user_name, users.email,users.phonenumber, users.is_deleted, roles.role FROM users INNER JOIN roles ON roles.id = users.role_id WHERE roles.role != 'admin' and roles.role != 'sitter' `;

    const params = [];

    // if (roleFilter) {
    //   queryString +=  AND LOWER(roles.role) = LOWER($${params.length + 1});
    //   params.push(roleFilter);
    // }

    queryString += ` ORDER BY users.id LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    }; `;

    params.push(pageSize, offset);

    const queryResult = await db.query(queryString, params);
    return queryResult.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.login = async (email) => {
  try {
    const user = await db.query(
      "SELECT users.id, email,password, roles.role FROM users inner join roles on roles.id = users.role_id WHERE email = $1 And users.is_deleted= false;",
      [email]
    );
    if (user.rows[0]) {
      return user.rows[0];
    } else {
      return "Email not found or user is denied to access.";
    }
  } catch (error) {
    throw error;
  }
};

Dashboard.countusers = async () => {
  try {
    const result = await db.query(
      `SELECT COUNT(users.id) AS user_count
        FROM users
        INNER JOIN roles ON users.role_id = roles.id
        WHERE roles.role != 'admin' and roles.role != 'sitter' AND users.is_deleted = false;`
    );
    return result.rows[0].user_count;
  } catch (err) {
    throw err;
  }
};

Dashboard.allsitters = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    let queryString = `SELECT sitters.id,users.user_name,users.phonenumber,users.email, sitters.experience_level,sitters.rate,REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image, users.is_deleted, roles.role FROM sitters INNER JOIN users on sitters.user_id = users.id INNER JOIN roles ON roles.id = users.role_id WHERE roles.role != 'admin' and roles.role = 'sitter' and users.is_deleted = false`;

    const params = [];

    queryString += ` ORDER BY users.id LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    };`;

    params.push(pageSize, offset);

    const result = await db.query(queryString, params);

    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
        const imageRef = storage.bucket().file("BabySitters/" + row.image);
        const [url] = await imageRef.getSignedUrl({
          action: "read",
          expires: "01-01-2500",
        });
        row.image = url;

        return row;
      })
    );

    return formattedResult;
  } catch (err) {
    throw err;
  }
};

Dashboard.countsitters = async () => {
  try {
    const result = await db.query(
      `SELECT COUNT(users.id) AS user_count
        FROM users
        INNER JOIN roles ON users.role_id = roles.id
        WHERE roles.role != 'admin' and roles.role = 'sitter' AND users.is_deleted = false;`
    );
    return result.rows[0].user_count;
  } catch (err) {
    throw err;
  }
};

module.exports = Dashboard;
