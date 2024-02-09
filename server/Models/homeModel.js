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


Home.newRequests = async () => {
    try {
      const queryResult = await db.query(`
      SELECT 
        courses.id,
        courses.title,
        courses.description,
        courses.trainer,
        REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
        categories.category,
        courses.start_time,
        courses.end_time,
        courses.site
      FROM 
        courses
        INNER JOIN categories ON categories.id = courses.category_id
      WHERE 
      courses.is_deleted = false and (courses.category_id = 3 or courses.category_id = 4) order by created_at desc limit 5;
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
      
          const imageRef = storage.bucket().file('images/' + row.image);
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