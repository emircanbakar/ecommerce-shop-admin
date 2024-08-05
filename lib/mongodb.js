const { MongoClient, ServerApiVersion } = require('mongodb');

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;

if (process.env.NODE_ENV === "development") {
  // Geliştirme modunda, Hot Module Replacement (HMR) nedeniyle
  // değerlerin korunması için global değişken kullanılır.
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options);
  }
  client = global._mongoClient;
} else {
  // Üretim modunda, global bir değişken kullanmak en iyisi değildir.
  client = new MongoClient(uri, options);
}

// Bir modül düzeyinde MongoClient'ı dışa aktar.
// Bu şekilde, istemci fonksiyonlar arasında paylaşılabilir.
module.exports = client;
