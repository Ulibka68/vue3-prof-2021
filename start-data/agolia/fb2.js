// var fbApp = require('firebase');
// import firebase from 'firebase/app';
var firebase =require( 'firebase/app');
require( 'firebase/firestore');

const firebaseConfig = {
    apiKey: "AI",
    authDomain: "vue3-practic-vlasov.firebaseapp.com",
    projectId: "vue3-practic-vlasov",
    storageBucket: "vue3-practic-vlasov.appspot.com",
    messagingSenderId: "70",
    appId: "1:70",
};


// fbApp = fbApp.initializeApp(firebaseConfig);
// var db = fbApp.firestore();
// var fbAuth = fbApp.auth();

var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(app);



async function testFB() {
    var citiesRef = db.collection("cities");

    await citiesRef.doc("SF").set({
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"] });
    await citiesRef.doc("LA").set({
        name: "Los Angeles", state: "CA", country: "USA",
        capital: false, population: 3900000,
        regions: ["west_coast", "socal"] });
    await citiesRef.doc("DC").set({
        name: "Washington, D.C.", state: null, country: "USA",
        capital: true, population: 680000,
        regions: ["east_coast"] });
    await citiesRef.doc("TOK").set({
        name: "Tokyo", state: null, country: "Japan",
        capital: true, population: 9000000,
        regions: ["kanto", "honshu"] });
    await citiesRef.doc("BJ").set({
        name: "Beijing", state: null, country: "China",
        capital: true, population: 21500000,
        regions: ["jingjinji", "hebei"] });
    // [END example_data]

    // "should update an array field in a document", () =>
        // [START update_document_array]
        var washingtonRef = db.collection("cities").doc("DC");

        // Atomically add a new region to the "regions" array field.
        washingtonRef.update({
            // regions: db.FieldValue.arrayUnion("greater_virginia")
            regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
        });

        // Atomically remove a region from the "regions" array field.
        washingtonRef.update({
            regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
            // regions: db.FieldValue.arrayRemove("east_coast")
        });
        // [END update_document_array]


    var citiesRef = db.collection("cities");

    citiesRef.doc("SF").collection("landmarks").doc().set({
        name: "Golden Gate Bridge",
        category : "bridge" });
    citiesRef.doc("SF").collection("landmarks").doc().set({
        name: "Golden Gate Park",
        category : "park" });

    citiesRef.doc("DC").collection("landmarks").doc().set({
        name: "National Gallery of Art",
        category : "museum" });
    citiesRef.doc("DC").collection("landmarks").doc().set({
        name: "National Mall",
        category : "park" });


    db.collection('game_events').doc().set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user_id: 'huDIl8H88kFAFAdcHayf',
        team_id: '6Q5BhBESeTPk8LT0O59I',
        event_type: 'rare_item_drop',
        display_text: 'You found a rare item!1',
    });

    db.collection('game_events').doc().set({
        details: {
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user_id: 'huDIl8H88kFAFAdcHayf',
            team_id: '6Q5BhBESeTPk8LT0O59I',
            event_type: 'rare_item_drop',
            display_text: 'You found a rare item!2',
        }
    });

    console.log('========= FINISH');
}

testFB();


function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) { /* do nothing */
    }
}

sleepFor(30);