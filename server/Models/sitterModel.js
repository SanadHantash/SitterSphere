const db = require("../config");
const { admin, storage } = require("../firebase");
const Sitter = {};

Sitter.addmydetails = async (
  userID,
  description,months_0_12,years_1_2,years_2_3,years_3_5,years_5,can_drive, non_smoker, cooking, draw, first_aid,reading,has_car,music,experience_level,salary
) => {
  try {
    const result = await db.query(
      `INSERT INTO sitters(user_id,description,months_0_12,
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
        experience_level,salary) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [
        userID,
        description,
        months_0_12,
        years_1_2,
        years_2_3,
        years_3_5,
        years_5,
        drivers_license,
        non_smoker,
        cooking,
        draw,
        first_aid,
        has_car,
        reading,
        music,
        experience_level,
        salary
      ]
    );
    return result;
  } catch (err) {
    throw err;
  }
};





Sitter.allsitters = async () => {
  try {
    const result = await db.query(`
        SELECT 
        sitters.id,
        sitters.rate,
        sitters.experience_level,
        users.user_name,
        REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image
    FROM 
        sitters
    INNER JOIN 
        users ON users.id = sitters.user_id
    WHERE 
        sitters.is_deleted = false and users.is_deleted = false
      `);

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

Sitter.detail = async (sitterID) => {
  try {
    const result = await db.query(
      `select sitters.id,sitters.description,sitters.experience_level,sitters.rate,
      users.user_name,
      REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image
      ,sitters.months_0_12,sitters.years_1_2,sitters.years_2_3,sitters.years_3_5,sitters.years_5,
      sitters.has_car,sitters.non_smoker,sitters.cooking,sitters.draw,sitters.first_aid,sitters.can_drive,sitters.reading,sitters.music
      from sitters inner join users on users.id = sitters.user_id where sitters.id = $1`,[sitterID]
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


Sitter.applysitter = async(sitterID,userID,childern_count,months_0_12,years_1_2,years_2_3,years_3_5,years_5,start_time,site)=>{
  try{
      const result = db.query(`insert into sitter_applications( sitter_id,user_id,childern_count,months_0_12,years_1_2,years_2_3,years_3_5,years_5,start_time,site)VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)`,[sitterID,userID,childern_count,months_0_12,years_1_2,years_2_3,years_3_5,years_5,start_time,site])
      return result
  }catch (err) {
    throw err;
  }
}

Sitter.isapplied = async (userID, sitterID) => {
  try {
    const checkAppliationQuery = 'SELECT * FROM sitter_applications WHERE user_id = $1 AND sitter_id = $2';
    const checkAppliationResult = await db.query(checkAppliationQuery, [userID, sitterID]);
    return checkAppliationResult.rows.length > 0;
  } catch (err) {
    throw err;
  }
};

Sitter.mydetail = async (userID) => {
  try {
    const result = await db.query(`
        SELECT 
        sitters.id,
        sitters.rate,
        sitters.experience_level,
        sitters.description,
        sitters.salary,
        sitters.user_id,
        sitters.months_0_12,sitters.years_1_2,sitters.years_2_3,sitters.years_3_5,sitters.years_5,
        sitters.has_car,sitters.non_smoker,sitters.cooking,sitters.draw,sitters.first_aid,sitters.can_drive,sitters.reading,sitters.music,
        REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image
    FROM 
        sitters
    INNER JOIN 
        users ON users.id = sitters.user_id
    WHERE 
        sitters.is_deleted = false and users.is_deleted = false and sitters.user_id=$1
      `,[userID]);

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

module.exports = Sitter;
