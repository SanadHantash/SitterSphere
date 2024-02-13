const db = require("../config");
const { admin, storage } = require('../firebase');
const Sitter = {};





Sitter.addmydetails = async (userID, education, description, ages, drivers_license, non_smoker, cooking, draw, first_aid,experience_level) => {
    try {
        const result = await db.query(
            `INSERT INTO sitters(user_id, education, description, ages, drivers_license, non_smoker, cooking, draw, first_aid,experience_level) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [userID, education, description, ages, drivers_license, non_smoker, cooking, draw, first_aid,experience_level]
        );
        return result;
    } catch (err) {
        throw err;
    }
}




Sitter.allsitters = async (userID) =>{
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
}









module.exports = Sitter;