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

var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(app);



async function testFB() {
    const querySnapshot = await db.collection("goods").where('categoryName','==','Пододеяльник').limit(3) .get();
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const allObjectData ={firebaseID:doc.id, ...doc.data()};
        console.log(allObjectData);
        // console.log(doc.id, " => ", allObjectData.name);
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