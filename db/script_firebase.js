
const { initializeApp } = require('./node_modules/firebase/app');
const { getAnalytics } = require('firebase/analytics');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

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

const firestore = async () => {
  try {
    const docRef = await addDoc(collection(db, 'testCollection'), {
      testField: 'Hello, Firebase!'
    });
    console.log('Document written with ID:', docRef.id);
  } catch (e) {
    console.error('Error adding document:', e);
  }
};

module.export = { firestore }

