const db = require('../config');
const Reaction = {};

Reaction.addrate = async (sitterID, userID, rate) => {
    try {
        const insertrating = await db.query(`INSERT INTO reaction (rate, user_id, sitter_id) VALUES ($1, $2, $3) RETURNING rate`,[rate, userID, sitterID]);
        const insertedRatingValue = insertrating.rows[0].rate;
        const result = await db.query(
            'UPDATE sitters SET rate= (SELECT AVG(rate) FROM reaction WHERE sitter_id = $1) WHERE id = $1 RETURNING *',[sitterID]);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};




module.exports = Reaction