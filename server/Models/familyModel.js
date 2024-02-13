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



Family.allrequests = async (userID) =>{
    try {
        const queryResult = await db.query(`
        SELECT 
          requests.id,
          requests.title,
          requests.description,
          requests.non_smoker,
          requests.drivers_license,
          requests.cooking,
          requests.draw,
          requests.first_aid,
          users.user_name,
          REPLACE(requests.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/requests/', '') AS image,
          requests.children_count,
          requests.start_time,
          requests.end_time
        FROM 
        requests
        INNER JOIN 
        users ON users.id = requests.user_id
        WHERE 
        requests.is_deleted = false and users.is_deleted=false;
      `);
        
      const formattedResult = await Promise.all(
          queryResult.rows.map(async (row) => {
            if (row.start_time !== null) {
              row.start_time = row.start_time.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
              });
    
              
    
              
              if (row.end_time !== null) {
                row.end_time = row.end_time.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                });
              }
              
            }
        
            const imageRef = storage.bucket().file('requests/' + row.image);
            const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
            row.image = url;
        
            return row;
          })
        );
    
        return formattedResult;
      } catch (err) {
        throw err;
      }
}

module.exports = Family