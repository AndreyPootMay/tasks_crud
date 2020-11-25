const connection = {
    host: '127.0.0.1',
    port: 3050,
    database: 'C:/DB/CRUD/TASKDB.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 4096         // default when creating database
}

module.exports = connection;
