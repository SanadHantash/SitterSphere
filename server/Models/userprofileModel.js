const { application } = require("express");
const db = require("../config");

const { storage } = require("../firebase");
const { log } = require("console");
const Profile = {};

Profile.userinfo = async (userID) => {
  try {

    const result = await db.query(
      "SELECT *, REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/profiles/', '') AS image, roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE users.id = $1 and users.is_deleted = false;",
      [userID]
    );

    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
        const imageRef = storage.bucket().file("profiles/" + row.image);
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

Profile.usersitterinfo = async (userID) => {
  try {
 
    const result = await db.query(
      "SELECT *, REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image,roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE users.id = $1;",
      [userID]
    );

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



Profile.profilepicture = async (userID, imageUrl) => {
  try {
    const result = await db.query("UPDATE users SET image = $1 WHERE id = $2", [
      imageUrl,
      userID,
    ]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Profile.checkUserExistence = async (email, user_name, phonenumber, userID) => {
  if (email) {
    const checkEmail = await db.query(
      "SELECT * FROM users WHERE email = $1 AND id <> $2;",
      [email, userID]
    );
    if (checkEmail.rows.length > 0) {
      throw new Error("invalid email");
    }
  }

  if (user_name) {
    const checkUsername = await db.query(
      "SELECT * FROM users WHERE user_name = $1 AND id <> $2;",
      [user_name, userID]
    );
    if (checkUsername.rows.length > 0) {
      throw new Error("invalid username");
    }
  }

  if (phonenumber) {
    const checkPhone = await db.query(
      "SELECT * FROM users WHERE phonenumber = $1 AND id <> $2;",
      [phonenumber, userID]
    );
    if (checkPhone.rows.length > 0) {
      throw new Error("invalid phonenumber");
    }
  }

  return true;
};

Profile.updateinfo = async (
  userID,
  first_name,
  last_name,
  user_name,
  email,
  phonenumber
) => {
  try {
    const query =
      "UPDATE users SET first_name = $2, last_name = $3, user_name = $4, email = $5, phonenumber = $6 WHERE id = $1";
    const result = await db.query(query, [
      userID,
      first_name,
      last_name,
      user_name,
      email,
      phonenumber,
    ]);

 
    return result.rows;
  } catch (err) {
    console.error("Error updating user info:", err);
    throw err;
  }
};

Profile.updatepassword = async (userID, hashedPassword) => {
  const result = await db.query(
    "update users set password = $2 where id = $1",
    [userID, hashedPassword]
  );
  return result.rows;
};

Profile.myrequests = async (userID) => {
  try {
    const result = await db.query(
      `SELECT requests.id, requests.title, requests.description,requests.children_count,
              REPLACE(requests.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/requests/', '') AS image,
              requests.pay, requests.time
       FROM requests
       WHERE requests.user_id = $1 and requests.is_deleted = false`,
      [userID]
    );

    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
        if (row.time !== null) {
          row.time = new Date(row.time).toLocaleDateString("en-US", {
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
    console.error("Error fetching user requests:", err);
    throw err;
  }
};

Profile.myrequestapplications = async (requestID) => {
  try {
    const result = await db.query(
      `SELECT 
      requests_applications.id, 
      requests_applications.request_id, 
      requests_applications.sitter_id,
      sitters.rate,
      users.user_name,
      sitters.experience_level,
      REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image
    FROM 
      requests_applications
    INNER JOIN 
      sitters ON sitters.id = requests_applications.sitter_id
    INNER JOIN 
      users ON users.id = requests_applications.user_id
    WHERE 
      requests_applications.request_id = $1 and requests_applications.is_deleted = false `,
      [requestID]
    );
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
    console.error("Error fetching request applications:", err);
    throw err;
  }
};

Profile.mysittapplications = async (userID) => {
  try {
    const result = await db.query(
      `SELECT 
      sitter_applications.id, 
      users.user_name,
      REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/profiles/', '') AS image,
      sitter_applications.start_time,
      sitter_applications.period,
      sitter_applications.salary,
      sitter_applications.site,
      sitter_applications.childern_count,
      sitter_applications.months_0_12,
      sitter_applications.years_1_2,
      sitter_applications.years_2_3,
      sitter_applications.years_3_5,
      sitter_applications.years_5
  FROM 
      sitter_applications
  INNER JOIN 
      sitters ON sitters.id = sitter_applications.sitter_id
  INNER JOIN 
      users ON users.id = sitter_applications.user_id
  WHERE 
      sitters.user_id = $1 AND sitter_applications.is_deleted = false`,
      [userID]
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

        const imageRef = storage.bucket().file("profiles/" + row.image);
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
    console.error("Error fetching request applications:", err);
    throw err;
  }
};

Profile.ignoreapplication = async (applicationID) => {
  try {
    const result = await db.query(
      "UPDATE requests_applications SET is_deleted = true WHERE id = $1",
      [applicationID]
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching request applications:", err);
    throw err;
  }
};

Profile.deleterequest = async (requestID) => {
  try {
    const result = await db.query(
      "UPDATE requests SET is_deleted = true WHERE id = $1",
      [requestID]
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching request applications:", err);
    throw err;
  }
};

Profile.mysittersapplications = async (userID) => {
  try {
    const result = await db.query(
      `select sitter_applications.id,users.user_name,sitter_applications.childern_count,sitter_applications.start_time,
        REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image
        ,sitter_applications.months_0_12,sitter_applications.years_1_2,sitter_applications.years_2_3,sitter_applications.years_3_5,sitter_applications.years_5
        ,sitter_applications.salary,sitter_applications.period from sitter_applications inner join sitters on sitter_applications.sitter_id = sitters.id inner join users on sitters.user_id = users.id where sitter_applications.user_id = $1 and sitter_applications.is_deleted = false `,
      [userID]
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

Profile.myfamiliesapplications = async (userID) => {
  try {
    const result = await db.query(
      `select requests_applications.id,requests.title,requests.children_count,
        REPLACE(requests.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/requests/', '') AS image
        ,requests.months_0_12,requests.years_1_2,requests.years_2_3,requests.years_3_5,requests.years_5,
        requests.non_smoker,
        requests.can_drive,
        requests.cooking,
        requests.draw,
        requests.first_aid,
        requests.reading,
        requests.music,
        requests.has_car,
        requests.pay,requests.time from requests_applications
         inner join sitters on requests_applications.sitter_id = sitters.id 
         inner join users on sitters.user_id = users.id 
         inner join requests on requests.id = requests_applications.request_id
         where requests_applications.user_id = $1 and requests_applications.is_deleted = false`,
      [userID]
    );
    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
        if (row.time !== null) {
          row.time = row.time.toLocaleDateString("en-US", {
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

Profile.acceptapplication = async (applicationID) => {
  try {
    const result = await db.query(
      `insert into familysitting_time(application_id) Values($1)`,
      [applicationID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Profile.getrequestofacceptedapplication = async(applicationID) => {
  try {
    const result = await db.query(
      `select requests_applications.request_id from requests_applications where requests_applications.id = $1  `,
      [applicationID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
}

Profile.deleteallapplicationsandrequest = async (requestID) => {
  try {
    
    const result1 = await db.query(
      "UPDATE requests_applications SET is_deleted = true WHERE request_id = $1",
      [requestID]
    );

    const result2 = await db.query(
      "UPDATE requests SET is_deleted = true WHERE id = $1",
      [requestID]
    );

   
    return { result1, result2 };
  } catch (err) {
    console.error("Error deleting applications and request:", err);
    throw err;
  }
};



Profile.contractsforfamily = async (userID) => {
  try {
   
    const result = await db.query(
      `SELECT 
        sittings_time.id,
        sitter_users.user_name,
        sitter_users.email,
        sitter_users.phonenumber ,
        sitter_applications.site,
        sitter_applications.childern_count,
        sitter_applications.start_time,
        sitter_applications.period,
        sitter_applications.salary 
    FROM 
        sittings_time 
    INNER JOIN 
        sitter_applications ON sitter_applications.id = sittings_time.application_id  
    INNER JOIN 
        sitters ON sitters.id = sitter_applications.sitter_id  
    INNER JOIN 
        users AS sitter_users ON sitter_users.id = sitters.user_id
    WHERE 
        sitter_applications.user_id = $1`,
      [userID]
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

Profile.contractsforsitter = async (userID) => {
  try {
    
    const result = await db.query(
      `SELECT 
                sittings_time.id,
                users.user_name,
                users.email,
                users.phonenumber,
                sitter_user.user_name AS user_name,
                sitter_user.email email,
                sitter_user.phonenumber AS phonenumber,
                sitter_user.address AS address,
                sitter_applications.site,
                sitter_applications.childern_count,
                sitter_applications.start_time,
                sitter_applications.period,
                sitter_applications.salary
            FROM 
                sittings_time
            INNER JOIN 
                sitter_applications ON sitter_applications.id = sittings_time.application_id
            INNER JOIN 
                sitters ON sitters.id = sitter_applications.sitter_id
            INNER JOIN 
                users ON users.id = sitters.user_id
            INNER JOIN 
                users AS sitter_user ON sitter_user.id = sitter_applications.user_id
            WHERE 
                sitters.user_id = $1`,
      [userID]
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

Profile.datesforfamily = async (userID) => {
  try {
 
    const result = await db.query(
      `SELECT 
        familysitting_time.id,
        sitter_users.user_name,
        sitter_users.email,
        sitter_users.phonenumber,
        requests.site,
        requests.children_count,
        requests.time,
        requests.pay,
        users.address
    FROM 
        familysitting_time
    INNER JOIN 
        requests_applications ON requests_applications.id = familysitting_time.application_id  
    INNER JOIN 
        requests ON requests.id = requests_applications.request_id  
    INNER JOIN 
        users AS sitter_users ON sitter_users.id = requests_applications.user_id
        INNER JOIN 
        users ON users.id = requests.user_id
    WHERE 
        requests.user_id = $1;`,
      [userID]
    );

    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
        if (row.time !== null) {
          row.time = row.time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
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

Profile.datesforsitter = async (userID) => {
  try {
     const result = await db.query(
      `SELECT 
      familysitting_time.id,
      requests.site,
      requests.children_count,
      requests.time,
      requests.pay,
      request_user.user_name AS user_name,
      request_user.email AS email,
      request_user.phonenumber AS phonenumber,
      request_user.address AS address
  FROM 
      familysitting_time
  INNER JOIN 
      requests_applications ON requests_applications.id = familysitting_time.application_id
  INNER JOIN 
      sitters ON sitters.id = requests_applications.sitter_id
  INNER JOIN 
      users ON users.id = sitters.user_id
  INNER JOIN 
      users AS sitter_user ON sitter_user.id = requests_applications.user_id
  INNER JOIN  
      requests ON requests.id = requests_applications.request_id
  INNER JOIN 
      users AS request_user ON requests.user_id = request_user.id
  WHERE 
      sitters.user_id = $1;
`,
      [userID]
    );

    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
        if (row.time !== null) {
          row.time = row.time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
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


Profile.acceptsitt = async (applicationID) => {
  try {
    const result = await db.query(
      `insert into sittings_time(application_id) Values($1)`,
      [applicationID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};



Profile.ignoresitt = async (applicationID) => {
  try {
    const result = await db.query(
      "UPDATE sitter_applications SET is_deleted = true WHERE id = $1",
      [applicationID]
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching request applications:", err);
    throw err;
  }
};

Profile.deleteapplication = async (applicationID) => {
  try {
    const result = await db.query(
      "UPDATE sitter_applications SET is_deleted = true WHERE id = $1",
      [applicationID]
    );
    return result.rows;
  } catch (err) {
    console.error("Error fetching request applications:", err);
    throw err;
  }
};

module.exports = Profile;
