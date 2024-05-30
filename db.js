/* Database setup for Games db */
const { Client } = require("pg"); 
const { getDatabaseUri } = require("./config"); 

let db; 
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') { 
    db = new Client({
        connectionString: getDatabaseUri(),
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    db = new Client({ 
        connectionString: getDatabaseUri(),
    ssl: {
        rejectUnauthorized: true
    }
    })
}; 

db.connect();
module.exports = db; 