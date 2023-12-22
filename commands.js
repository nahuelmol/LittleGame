const db = require('./cnn')

const collection = db.collection('your_collection');

// Consulta todos los documentos en la colección
collection.get().then(snapshot => {
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
});
