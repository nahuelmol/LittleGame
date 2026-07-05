const findUser = async (username) => {
    const db = require('./fbconn.js');
    const snapshot = await db
        .collection("users")
        .where("name", "==", username)
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
