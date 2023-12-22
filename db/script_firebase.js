// Import the functions you need from the SDKs you need
const { initializeApp } = require('./node_modules/firebase/app');
const { getAnalytics } = require('firebase/analytics');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MESSUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const testFirestore = async () => {
  try {
    const docRef = await addDoc(collection(db, 'testCollection'), {
      testField: 'Hello, Firebase!'
    });
    console.log('Document written with ID:', docRef.id);
  } catch (e) {
    console.error('Error adding document:', e);
  }
};

// Run the test function
testFirestore();
