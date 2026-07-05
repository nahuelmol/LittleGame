
const admin = require("firebase-admin");
const etc   = "/etc/secrets/fb-admin.json"
const local = "./fb-admin.json"
const admin_loc = process.env.NODE_ENV === 'production' ? etc : local;
const serviceAccount = require(admin_loc);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;
