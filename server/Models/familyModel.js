const db = require("../config");
const { admin, storage } = require("../firebase");
const Family = {};

Family.addrequest = async (
  userID,
  title,
  description,
  children_count,
  months_0_12,
  years_1_2,
  years_2_3,
  years_3_5,
  years_5,
  can_drive,
  non_smoker,
  cooking,
  draw,
  first_aid,
  has_car,
  reading,
  music,
  imageUrl,
  time,
  pay
) => {
  try {
    const result = await db.query(
      `INSERT INTO requests (user_id,title,description,children_count,months_0_12,years_1_2,years_2_3,years_3_5,years_5,can_drive,non_smoker,cooking,draw,first_aid,has_car,reading,music,image,time,pay) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`,
      [
        userID,
        title,
        description,
        children_count,
        months_0_12,
        years_1_2,
        years_2_3,
        years_3_5,
        years_5,
        can_drive,
        non_smoker,
        cooking,
        draw,
        first_aid,
        has_car,
        reading,
        music,
        imageUrl,
        time,
        pay,
      ]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

Family.allrequests = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    let queryString = `
      SELECT 
        requests.id,
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
        requests.pay,
        users.user_name,
        users.address,
        REPLACE(requests.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/requests/', '') AS image,
        requests.children_count,
        time
      FROM 
        requests
      INNER JOIN 
        users ON users.id = requests.user_id
      WHERE 
        requests.is_deleted = false and users.is_deleted=false
    `;

    queryString += ` ORDER BY requests.id LIMIT $1 OFFSET $2`;

    const queryResult = await db.query(queryString, [pageSize, offset]);

    const formattedResult = await Promise.all(
      queryResult.rows.map(async (row) => {
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
    throw err;
  }
};


Family.detail = async (requestID) => {
  try {
    const result = await db.query(
      `select requests.id,requests.title,requests.description,
      users.user_name,
      REPLACE(requests.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/requests/', '') AS image
      ,requests.months_0_12,requests.years_1_2,requests.years_2_3,requests.years_3_5,requests.years_5,
      requests.has_car,requests.non_smoker,requests.cooking,requests.draw,requests.first_aid,requests.can_drive,requests.reading,requests.music,requests.site
      from requests inner join users on users.id = requests.user_id where requests.id = $1`,
      [requestID]
    );
    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
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

Family.applyrequest = async (requestID, userID) => {
  try {
    const sitterIDQueryResult = await db.query(
      `SELECT sitters.id FROM sitters WHERE user_id = $1`,
      [userID]
    );

    const sitterID = sitterIDQueryResult.rows[0].id;

    const result = await db.query(
      `INSERT INTO requests_applications(request_id, user_id, sitter_id) VALUES($1, $2, $3)`,
      [requestID, userID, sitterID]
    );

    return result;
  } catch (err) {
    throw err;
  }
};

Family.isapplied = async (userID, requestID) => {
  try {
    const checkAppliationQuery =
      "SELECT * FROM requests_applications WHERE user_id = $1 AND request_id = $2";
    const checkAppliationResult = await db.query(checkAppliationQuery, [
      userID,
      requestID,
    ]);
    return checkAppliationResult.rows.length > 0;
  } catch (err) {
    throw err;
  }
};




module.exports = Family;
