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




module.exports = Profile