const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.firestore_write_test = functions.https.onRequest((req, res) => {
    res.status(200).send(`Write functions executed.`);
    console.log("Write function");
    console.log(db.collection("testing").add(
        {
            "data": "testing from Firebase Cloud Functions",
        },
    ));
});

const getDocumentNames = async () => {
    const snapshot = await db.collection("testing").get();
    snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
};

exports.firestore_get_test = functions.https.onRequest((req, res) => {
    res.status(200).send(
        "Read functions executed.",
    );
    console.log("Read function");
    getDocumentNames();

    console.log(db.collection("testing").get());
});
