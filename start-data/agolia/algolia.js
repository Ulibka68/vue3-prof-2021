const algoliasearch = require('algoliasearch');

const ALGOLIA_ID = 'ZRNF';
const ALGOLIA_ADMIN_KEY = 'e5b';
const ALGOLIA_SEARCH_KEY = '08c';

const ALGOLIA_INDEX_NAME = 'goods';


async function algolia() {
// Write to the algolia index
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    console.log('initIndex');
    const note =[ {
        objectId:'0041ORScHRWC1uFfefyg',
        categoryName:'Пододеяльник',
        description:`Пододеяльник Arya Полосатый Сатин Otel от компании Arya из хлопкового сатина с отделкой в полоску. Сатин средней плотности – золотая середина среди сатиновых пододеяльников. Он достаточно плотный, долго не изнашивается, но стоит дешевле сатина повышенной плотности. Пододеяльник из сатина не блестит как шелк, но приятен на ощупь и довольно мягкий. Краска на этой ткани держится очень хорошо: новые пододеяльники не полиняют и со временем не станут выцветать.`
    }];
    // await index.saveObject(note);
    const res=await index.saveObjects(note, { autoGenerateObjectIDIfNotExist: true });
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