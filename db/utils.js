import db from './fbconn.js';

const findUser = async (data, typedata) => {
    const snapshot = await db
        .collection("users")
        .where(typedata, "==", data)
        .limit(1)
        .get();

    if (snapshot.empty) {
        console.log('Collection does not exists');
        return null;
    }

    const doc = snapshot.docs[0];

    return {
        id: doc.id,
        ...doc.data()
    };
};

const findContact = async (data, typedata) => {
    const snapshot = await db
        .collection("contactCollection")
        .where(typedata, "==", data)
        .limit(1)
        .get();

    if (snapshot.empty) {
        console.log('Collection does not exists');
        return null;
    }

    const doc = snapshot.docs[0];

    return {
        id: doc.id,
        ...doc.data()
    };
};


export {
    findUser,
    findContact,
}
