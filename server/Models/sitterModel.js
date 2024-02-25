const db = require("../config");
const { admin, storage } = require("../firebase");
const Sitter = {};

Sitter.addmydetails = async (
  userID,
  education,
  description,
  ages,
  drivers_license,
  non_smoker,
  cooking,
  draw,
  first_aid,
  experience_level
) => {
  try {
    const result = await db.query(
      `INSERT INTO sitters(user_id, education, description, drivers_license, non_smoker, cooking, draw, first_aid,experience_level) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        userID,
        education,
        description,
        ages,
        drivers_license,
        non_smoker,
        cooking,
        draw,
        first_aid,
        experience_level,
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
      `select sitters.id,sitters.description,sitters.education,sitters.experience_level,sitters.rate,
      users.user_name,
      REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image
      ,sitters."0_12_months",sitters."1_2_years",sitters."2_3_years",sitters."3_5_years",sitters."+5_years",
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

module.exports = Sitter;
