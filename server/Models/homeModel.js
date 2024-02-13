const db = require('../config');
const { admin, storage } = require('../firebase');
const Home = {};


Home.topratedsitters = async () => {
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
      sitters.is_deleted = false 
  ORDER BY 
      rate DESC 
  LIMIT 10;
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


Home.recentrequests = async () => {
    try {
      const queryResult = await db.query(`
      SELECT 
        requests.id,
        requests.title,
        users.user_name,
        requests.description,
        requests.non_smoker,
        requests.drivers_license,
        requests.cooking,
        requests.draw,
        requests.first_aid,
        REPLACE(requests.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/requests/', '') AS image,
        requests.children_count,
        requests.start_time,
        requests.end_time
      FROM 
      requests
      INNER JOIN 
      users ON users.id = requests.user_id
      WHERE 
      requests.is_deleted = false and users.is_deleted=false order by requests.created_at desc limit 5;
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
  };





module.exports = Home