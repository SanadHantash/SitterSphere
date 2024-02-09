const db = require("../config");
const Sitter = {};





Sitter.addmydetails = async (userID, education, description, ages, drivers_license, non_smoker, cooking, draw, first_aid,experince_level) => {
    try {
        const result = await db.query(
            `INSERT INTO sitters(user_id, education, description, ages, drivers_license, non_smoker, cooking, draw, first_aid,experince_level) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [userID, education, description, ages, drivers_license, non_smoker, cooking, draw, first_aid,experince_level]
        );
        return result;
    } catch (err) {
        throw err;
    }
}



// Sitter.allsitters = async (userID) =>{
//     try{
//         const result = await db.query(`select sitters.id,sitters. from sitters where user_id = $1`,[userID]);
//         return result.rows;
//     }catch (err) {
//         throw err;
//     }
// }








module.exports = Sitter;