const findUser = async (data, typedata) => {
    const db = require('./fbconn.js');
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
    const db = require('./fbconn.js');
    const snapshot = await db
        .collection("contacts")
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


module.exports = {
    findUser,
}
