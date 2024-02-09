const db = require('../config');
const { admin, storage } = require('../firebase');
const Family = {};







Family.addrequest = async (userID, title, description, children_count, ages, requirements, imageUrl, start_time, end_time) => {
    try {
        const result = await db.query(
            `INSERT INTO requests (user_id, title, description, children_count, ages, requirements, image, start_time, end_time) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [userID, title, description, children_count, ages, requirements, imageUrl, start_time, end_time]
        );
        return result;
    } catch (err) {
        throw err;
    }
}


module.exports = Family