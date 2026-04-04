const db = require('./cnn')

const collection = db.collection('your_collection');

collection.get().then(snapshot => {
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
});
