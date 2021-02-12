const algoliasearch = require('algoliasearch');


const ALGOLIA_ID = 'Z';
const ALGOLIA_ADMIN_KEY = 'e5';
const ALGOLIA_SEARCH_KEY = '08';

const ALGOLIA_INDEX_NAME = 'goods';


async function algolia() {

    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    console.log('initIndex');


    // await index.saveObject(note);
    /*
    const res=await index.search("водны", {
        "getRankingInfo": true,
        "analytics": false,
        "enableABTest": false,
        "hitsPerPage": 10,
        "attributesToRetrieve": "*",
        "attributesToSnippet": "*:20",
        "snippetEllipsisText": "…",
        "responseFields": "*",
        "maxValuesPerFacet": 100,
        "page": 1,
        "facets": [
            "*",
            "categoryName"
        ],
        "facetFilters": [
            [
                "categoryName:Полотенца"
            ]
        ]
    });
    */

    /*
    const res=await index.search("водны", {
        "hitsPerPage": 3,
        "attributesToRetrieve": "*",
        "responseFields": "*",
    });
     */

    const res=await index.search("вод", {
        "hitsPerPage": 3,
        "attributesToRetrieve": "*",
        "responseFields": "*",
        "page": 1,
        "facets": ["categoryName"],
        "facetFilters": [["categoryName:Полотенца"]]
    });
    // "facets": ["categoryName"],

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