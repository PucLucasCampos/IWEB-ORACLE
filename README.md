### ORACLEDB - node
```
// myscript.js

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = ...  // set mypw to the hr schema password

async function run() {

    const connection = await oracledb.getConnection ({
        user          : "hr",
        password      : mypw,
        connectString : "localhost/FREEPDB1"
    });

    const result = await connection.execute(
        `SELECT manager_id, department_id, department_name
         FROM departments
         WHERE manager_id = :id`,
        [103],  // bind value for :id
    );

    console.log(result.rows);
    await connection.close();
}

run();
```