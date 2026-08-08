
import admin from 'firebase-admin';

const local = './fb-admin.json';
const etc   = '/etc/secrets/fb-admin.json';

const admin_loc = process.env.NODE_ENV === 'production' ? etc : local;

const { default: serviceAccount } = await import(admin_loc, {
  with: { type: "json" },
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export default db;
