const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "login_system_booking"
});



module.exports = pool;