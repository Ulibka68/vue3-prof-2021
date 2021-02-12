var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : "rat.beget.tech",
    user     : "root",
    password : "Yce@",
    database : "auth"
});

module.exports.connection = connection;

// connection.connect();

function connectionPromise() {
    return new Promise( (resolve,reject)=>{
        connection.connect( (err)=>{resolve(err)});
    });
}
module.exports.connectionPromise=connectionPromise;

function queryPromise(sql) {
    return new Promise((resolve,reject) => {

        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        });
    });
}

module.exports.queryPromise=queryPromise;

/*
connection.query(`select * from v_goods_list_client limit 5`, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end();


function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ }
}

sleepFor(3000);
*/
