const algoliasearch = require('algoliasearch');
const firebase =require( 'firebase/app');
require( 'firebase/firestore');



 const firebaseConfig = {

    appId: "1:708075",
};




async function algolia() {

    var app = firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore(app);

    // const querySnapshot = await db.collection("goods").where('categoryName','==','Пододеяльник').limit(3) .get();
    const querySnapshot = await db.collection("goods").get();
    const resultDataSet=[];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const allObjectData ={objectID:doc.id, ...doc.data()};
        allObjectData.sold = (allObjectData.quantity == 0);
        resultDataSet.push(allObjectData)
        // console.log(allObjectData);
        // console.log(doc.id, " => ", allObjectData.name);
    });

    // console.log(resultDataSet);



    // Write to the algolia index
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    console.log('initIndex');


    // await index.saveObject(note);
    const res=await index.saveObjects(resultDataSet, { autoGenerateObjectIDIfNotExist: true });
    console.log(res);



    console.log('========= FINISH');
}


algolia();

function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) { /* do nothing */
    }
}

sleepFor(300);