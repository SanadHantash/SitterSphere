const admin = require('firebase-admin');
const serviceAccount = require('./privatekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'sittersphere-bfd8b.appspot.com',


});

const storage = admin.storage();

module.exports = { admin, storage };
