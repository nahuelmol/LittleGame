
const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');
const { getFirestore, collection, addDoc, doc, deleteDoc } = require('firebase/firestore');

const fbConfig = {
  apiKey: process.env.FB_APIKEY,
  authDomain: process.env.FB_AUTHDOMAIN,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGEBUCKET,
  messagingSenderId: process.env.FB_MESSAGINGSENDERID,
  appId: process.env.FB_APPID,
  measurementId: process.env.FB_MESSUREMENTID
};

const app = initializeApp(fbConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const add_contact = async (mydoc) => {
  try {
    await addDoc(collection(db, 'contactCollection'), mydoc);
    console.log('Contact Document written');
  } catch (e) {
    console.error('Error adding document:', e);
  }
};

const del_contact = async (id) => {
  try {
    await deleteDoc(doc(db, 'contactCollection'), id);
    console.log('Contact Document deleted');
  } catch (e) {
    console.error('Error adding document:', e);
  }
};

module.export = {
    add_contact,
    del_contact,
}

