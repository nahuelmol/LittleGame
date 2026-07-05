

const add_contact = async (mydoc) => {
    try {
        const db = require('./fbconn.js')
        await db.collection('contactCollection').add(mydoc);
        console.log('Contact Document written');
    } catch (e) {
        console.error('Error adding document:', e);
    }
};

const add_user = async (user) => {
    try {
        const db = require('./fbconn.js')
        await db.collection('users').add(user);
        console.log('User saved correctly;');
    } catch (e) {
        console.error('Error adding document:', e);
    }
};

const del_contact = async (id) => {
    try {
        const db = require('./fbconn.js')
        await db.collection('contactCollection').doc(id).delete();
        console.log('Contact Document deleted');
    } catch (e) {
        console.error('Error adding document:', e);
    }
};

module.exports = {
    add_contact,
    del_contact,
    add_user,
}

