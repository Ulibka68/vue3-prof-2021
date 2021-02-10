var fbApp = require('firebase');
var mysql = require('./sql1');

const firebaseConfig = {
    apiKey: "AI",
    authDomain: "vue3-practic-vlasov.firebaseapp.com",
    projectId: "vue3-practic-vlasov",
    storageBucket: "vue3-practic-vlasov.appspot.com",
    messagingSenderId: "70",
    appId: "1:70",
};


fbApp = fbApp.initializeApp(firebaseConfig);
var fbDB = fbApp.firestore();
var fbAuth = fbApp.auth();



async function testSQL() {

    await mysql.connectionPromise();
    const res = await mysql.queryPromise(`select * from v_goods_list_client `);
    // console.log(res);
    mysql.connection.end();
    const categoryNames =new Set();

    for (let val of res) {
        console.log('--------------------------')
        const itm = {...val};
        let oneGood = {};
        oneGood.name = itm['название'];
        oneGood.price = itm['розничная цена'];
        oneGood.description = itm['описание'];
        oneGood.id=itm.id;

        const attr = JSON.parse(itm.attributes)
        // console.log(attr.attributes);
        const categ = attr.attributes.filter((val) => val['Категория']);
        oneGood.categoryName = categ[0]['Категория'].name;

        const p2 = JSON.parse(itm.pictures);
        if (p2) { // есть картинка
            oneGood.picture = p2.pictures[0];
        //    записать в коллекцию
            console.log(oneGood);
            const res = await fbDB.collection('goods').add(oneGood);
            // console.log(res.id);
            categoryNames.add(oneGood.categoryName);
        }
    }

    for (let itm of categoryNames) {
        const res = await fbDB.collection('categories').add({categoryName: itm});
    }

    console.log('>=>=>=>=>=>=>=>=>=>=>=>=>=>=>=>= FINISH')
}

testSQL();


function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) { /* do nothing */
    }
}

sleepFor(30);