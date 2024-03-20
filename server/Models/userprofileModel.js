const db = require('../config');

const {storage } = require('../firebase');
const Profile = {};


Profile.userinfo = async (userID) => {
    try{
            const result = await db.query("SELECT *, REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/profiles/', '') AS image, roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE users.id = $1 and users.is_deleted = false;", [userID]);

            const formattedResult = await Promise.all(
                result.rows.map(async (row) => {
              
                  const imageRef = storage.bucket().file('profiles/' + row.image);
                  const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
                  row.image = url;
              
                  return row;
                })
              );
            
            return formattedResult;
    }
    catch(err){
        throw err;
    }
}
Profile.usersitterinfo = async (userID) => {
    try{
            const result = await db.query("SELECT *, REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image,roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE users.id = $1;", [userID]);

            const formattedResult = await Promise.all(
                result.rows.map(async (row) => {
              
                  const imageRef = storage.bucket().file('BabySitters/' + row.image);
                  const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
                  row.image = url;
              
                  return row;
                })
              );
            
            return formattedResult;
    }
    catch(err){
        throw err;
    }
}


Profile.profilepicture  = async (userID,imageUrl) => {
    try{
        const result = await db.query('UPDATE users SET image = $1 WHERE id = $2', [imageUrl, userID]);
        return result.rows;
    }
    catch(err){
        throw err;
    }
};


  

    Profile.checkUserExistence = async (email, user_name, phonenumber, userID) => {
      if (email) {
        const checkEmail = await db.query('SELECT * FROM users WHERE email = $1 AND id <> $2;', [email, userID]);
        if (checkEmail.rows.length > 0) {
          throw new Error("invalid email");
        }
      }
    
      if (user_name) {
        const checkUsername = await db.query('SELECT * FROM users WHERE user_name = $1 AND id <> $2;', [user_name, userID]);
        if (checkUsername.rows.length > 0) {
          throw new Error("invalid username");
        }
      }
    
      if (phonenumber) {
        const checkPhone = await db.query('SELECT * FROM users WHERE phonenumber = $1 AND id <> $2;', [phonenumber, userID]);
        if (checkPhone.rows.length > 0) {
          throw new Error("invalid phonenumber");
        }
      }
    
      return true;
    };

    Profile.updateinfo = async (userID, first_name, last_name, user_name, email, phonenumber) => {
      try {
        const query = 'UPDATE users SET first_name = $2, last_name = $3, user_name = $4, email = $5, phonenumber = $6 WHERE id = $1';
        const result = await db.query(query, [userID, first_name, last_name, user_name, email, phonenumber]);
    
        console.log(`User info updated successfully. Rows affected: ${result.rowCount}`);
    
        return result.rows;
      } catch (err) {
        console.error('Error updating user info:', err);
        throw err; 
      }
    };


Profile.updatepassword = async (userID,hashedPassword) =>{
  const result  = await db.query('update users set password = $2 where id = $1',[userID,hashedPassword]);
  return result.rows;
}


Profile.myrequests = async (userID) => {
  try {
    const result = await db.query(
      `SELECT requests.id, requests.title, requests.description,requests.children_count,
              REPLACE(requests.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/requests/', '') AS image,
              requests.pay, requests.time
       FROM requests
       WHERE requests.user_id = $1`,
      [userID]
    );

    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
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
    console.error('Error fetching user requests:', err);
    throw err;
  }
};

Profile.myrequestapplications = async (userID,requestID) => {
  try{
    const result = await db.query(
      `SELECT requests_applications.id, requests_applications.request_id, requests_applications.sitter_id,sitters.rate,users.user_name,sitters.experience_level,
              REPLACE(users.image, 'https://storage.googleapis.com/sittersphere-bfd8b.appspot.com/BabySitters/', '') AS image,
            
       FROM requests_applications inner join sitters on sitters.id=requests_applications.sitter_id inner join users on users.id=requests_applications.user_id
       WHERE requests.user_id = $1 and requests_applications.request_id =$2 `,
      [userID]
    );
    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
    
        const imageRef = storage.bucket().file('BabySitters/' + row.image);
        const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
        row.image = url;
    
        return row;
      })
    );
  
  return formattedResult;
  }catch (err) {
    console.error('Error fetching request applications:', err);
    throw err;
  }
}

module.exports = Profile