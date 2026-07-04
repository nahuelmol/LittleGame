
//const { initializeApp } = require('firebase/app');
//const { getFirestore, collection, addDoc, doc, deleteDoc } = require('firebase/firestore');

const admin = require("firebase-admin");
const serviceAccount = require("/etc/secrets/fb-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//const fbConfig = {
//  apiKey: process.env.FB_APIKEY,
//  authDomain: process.env.FB_AUTHDOMAIN,
//  projectId: process.env.FB_PROJECTID,
//  storageBucket: process.env.FB_STORAGEBUCKET,
//  messagingSenderId: process.env.FB_MESSAGINGSENDERID,
//  appId: process.env.FB_APPID,
//  measurementId: process.env.FB_MESSUREMENTID
//};
//const app = initializeApp(fbConfig);
//const db = getFirestore(app);

const add_contact = async (mydoc) => {
  try {
    await db.collection('contactCollection').add(mydoc);
    console.log('Contact Document written');
  } catch (e) {
    console.error('Error adding document:', e);
  }
};

const del_contact = async (id) => {
  try {
    await db.collection('contactCollection').doc(id).delete();
    console.log('Contact Document deleted');
  } catch (e) {
    console.error('Error adding document:', e);
  }
};

module.exports = {
    add_contact,
    del_contact,
}

