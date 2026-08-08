import db from './fbconn.js';

const finder = async (collection, data, typedata, opc) => {
    if (opc == "contains") {
        const snap = await db.collection(collection).get();

        if (snap.empty) {
            return [null, 'Collection does not exists'];
        }

        let result = [];
        snap.docs.forEach(doc => {
            const name = doc.data()[typedata];
            if (name.includes(data)){
                result.push(doc.data())
            };
        });
        return [result, 'Data available']

    } else if (opc == "equal") {
        const snap = await db
            .collection(collection)
            .where(typedata, "==", data)
            .limit(1)
            .get();

        if (snap.empty) {
            return [null, 'Collection does not exists'];
        }

        const doc = snap.docs[0];
        return [{
            id: doc.id,
            ...doc.data()
        }, 'Collection exists'];
    }

};

export {
    finder,
}
