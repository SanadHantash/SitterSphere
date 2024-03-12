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
    let queryString = `SELECT users.id, users.first_name, users.last_name, users.user_name, users.email,users.phonenumber, users.is_deleted, roles.role FROM users INNER JOIN roles ON roles.id = users.role_id WHERE roles.role != 'admin' `;

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
    let queryString = `SELECT sitters.id,users.user_name,users.phonenumber,users.email,sitters.experience_level,sitters.rate,REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image, users.is_deleted, roles.role FROM users INNER JOIN sitters on sitters.user_id = users.id INNER JOIN roles ON roles.id = users.role_id WHERE roles.role != 'admin' and roles.role = 'sitter' and users.is_deleted = false`;

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
      `SELECT COUNT(users.id) AS sitter_count
        FROM users
        INNER JOIN roles ON users.role_id = roles.id

        WHERE roles.role != 'admin' and roles.role = 'sitter' AND users.is_deleted = false;`
    );
    return result.rows[0].sitter_count;
  } catch (err) {
    throw err;
  }
};

Dashboard.countrequests = async () => {
  try {
    const result = await db.query(
      `SELECT COUNT(requests.id) AS request_count
        FROM requests
        WHERE requests.is_deleted = false;`
    );
    return result.rows[0].request_count;
  } catch (err) {
    throw err;
  }
};

Dashboard.allfamiliesrequests = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    let queryString = `SELECT 
      requests.id,
      requests.title,
      requests.description,
      requests.start_time,
      REPLACE(requests.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/requests/', '') AS image,
      requests.children_count
    FROM 
      requests 
      inner join users on users.id = requests.user_id
    WHERE 
      requests.is_deleted = false AND users.is_deleted = false`;

    const params = [];

    queryString += ` ORDER BY requests.id LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    };`;

    params.push(pageSize, offset);

    const result = await db.query(queryString, params);

    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
        if (row.start_time !== null) {
          row.start_time = row.start_time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
    
        const imageRef = storage.bucket().file("requests/" + row.image);
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

Dashboard.deleteuser = async (userID) => {
  try {
    const result = await db.query(
      "UPDATE users SET is_deleted = NOT is_deleted WHERE users.id = $1",
      [userID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.deletesitter = async (sitterID) => {
  try {
    const result = await db.query(
      "Update sitters set sitters.is_deleted = true where sitters.id = $1",
      [sitterID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.sittertimes = async (sitterID) => {
  try {
    const result = await db.query(
      "select sittings_time.id ,users.user_name,users.email,users.phonenumber,sitter_applications.site,sitter_applications.childern_count,sitter_applications.start_time,sitter_applications.period,sitter_applications.salary from sittings_time inner join sitter_applications on sitter_applications.id = sittings_time.application_id  inner join users on users.id = sitter_applications.user_id  where sitter_applications.sitter_id = $1",
      [sitterID]
    );

    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
        if (row.start_time !== null) {
          row.start_time = row.start_time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }

        return row;
      })
    );

    return formattedResult;
  } catch (err) {
    throw err;
  }
};

Dashboard.detail = async (sitterID) => {
  try {
    const result = await db.query(
      `select sitters.id,sitters.description,sitters.education,sitters.experience_level,sitters.rate,
      users.user_name,
      REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image
      ,sitters."0_12_months",sitters."1_2_years",sitters."2_3_years",sitters."3_5_years",sitters."+5_years",
      sitters.has_car,sitters.non_smoker,sitters.cooking,sitters.draw,sitters.first_aid,sitters.can_drive,sitters.reading,sitters.music
      from sitters inner join users on users.id = sitters.user_id where sitters.id = $1`,
      [sitterID]
    );
    console.log(result);
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

Dashboard.countsitterapplications = async (sitterID) => {
  try {
    const result = await db.query(
      `SELECT COUNT(sitter_applications.id) AS application_count
        FROM sitter_applications  
        WHERE sitter_applications.sitter_id = $1;`,
      [sitterID]
    );
    return result.rows[0].application_count;
  } catch (err) {
    throw err;
  }
};

Dashboard.sittingscount = async (sitterID) => {
  try {
    const result = await db.query(
      `SELECT COUNT(familysitting_time.id) AS familysitting_count
      FROM familysitting_time inner join requests_applications on requests_applications.id = familysitting_time.request_id  
      WHERE requests_applications.sitter_id  = $1;`,
      [sitterID]
    );
    return result.rows[0].familysitting_count;
  } catch (err) {
    throw err;
  }
};

Dashboard.familytimes = async (sitterID) => {
  try {
    const queryResult = await db.query(
      `
      SELECT 
      familysitting_time.id,
      requests_applications.sitter_id,
      requests.title,
      requests.description,
      requests.non_smoker,
      requests.can_drive,
      requests.cooking,
      requests.draw,
      requests.first_aid,
      requests.reading,
      requests.music,
      requests.has_car,
      REPLACE(requests.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/requests/', '') AS image,
      requests.children_count,
      requests.time,
  FROM 
      familysitting_time
      INNER JOIN requests_applications ON familysitting_time.request_id = requests_applications.id
      INNER JOIN requests ON requests_applications.request_id = requests.id 
  WHERE 
      requests_applications.sitter_id = $1;
      `,
      [sitterID]
    );

    const formattedResult = await Promise.all(
      queryResult.rows.map(async (row) => {
        if (row.time !== null) {
          row.start_time = row.start_time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          });
        }

        const imageRef = storage.bucket().file("requests/" + row.image);
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


Dashboard.deleterequest = async (requestID) => {
  try {
    const result = await db.query(
      "UPDATE requests SET is_deleted = true WHERE id = $1",
      [requestID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};


module.exports = Dashboard;
