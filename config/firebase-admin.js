const admin = require('firebase-admin');
const path = require('path');

module.exports = {
  credential: admin.credential.cert(path.join(__dirname, './secrets/creds.json')),
  databaseURL: 'https://discovr-d0d4a.firebaseio.com'
};
