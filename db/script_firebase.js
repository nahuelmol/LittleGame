
import db from './fbconn.js';

const add_contact = async (mydoc) => {
    try {
        await db.collection('contactCollection').add(mydoc);
        console.log('Contact Document written');
        return true;
    } catch (e) {
        console.error('Error adding document:', e);
        return false;
    }
};

const add_user = async (user) => {
    try {
        await db.collection('users').add(user);
        console.log('User saved correctly;');
    } catch (e) {
        console.error('Error adding document:', e);
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
    add_contact,
    del_contact,
    add_user,
}

