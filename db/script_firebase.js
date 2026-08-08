
import db from './fbconn.js';

const add = async (doc) => {
    try {
        await db.collection('contactCollection').add(doc);
        return [true, 'New document for ' + doc];
    } catch (e) {
        return [false, 'Error adding document:' + e];
    }
};

const del_contact = async (id) => {
    try {
        if(id == "all") {
            const snapshot = await db.collection('contactCollection').get();
            const batch = db.batch();
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            });

            await batch.commit();
        } else {
            await db.collection('contactCollection').doc(id).delete();
            console.log('Contact Document deleted');
        }

    } catch (e) {
        console.error('Error adding document:', e);
    }
};

export {
    add,
    del_contact,
}

