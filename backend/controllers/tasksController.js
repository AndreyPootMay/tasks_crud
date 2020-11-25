const firebird = require('node-firebird');
const connection = require('../db');

const convertBufferArray = data => {
    return (data && data instanceof Uint8Array) ? String.fromCharCode.apply(null, new Uint8Array(data)) : data;
};

// Count all the taks
function countAll(callback) {
    firebird.attach(connection, (err, db) => {
        if (err) console.log(err)

        db.query('SELECT COUNT(*) FROM tasks WHERE active = 1', (err, result) => {
            if (err) console.log(err)
            callback(result[0].COUNT);
            db.detach();
        })
    });
};

// List all the tasks
exports.findAll = (req, res) => {
    firebird.attach(connection, (err, db) => {
        if (err) console.log(err)

        db.query(`SELECT id, task_name, task_description, priority, active FROM tasks WHERE active = 1`, (err, result) => {
            if (err) {
                db.detach();
                res.status(400);
                console.log(err)
                return res.send(`\n${err.message}\n`);
            }

            const rows = [];
            result.forEach(row => {
                let tempObj = {};
                Object.keys(row).forEach(el => {
                    tempObj[el] = convertBufferArray(row[el]);
                });
                rows.push(tempObj);
            });

            res.status(200);
            return res.send(rows);
        });
    });
};

// Insert a new task
exports.insert = (req, res) => {
    const { TASK_NAME, TASK_DESCRIPTION, PRIORITY } = req.body;
    console.table({ TASK_NAME, TASK_DESCRIPTION, PRIORITY });

    firebird.attach(connection, (err, db) => {
        if (err) throw err;

        db.query('INSERT INTO TASKS (task_name, task_description, priority) VALUES(?, ?, ?)', [TASK_NAME, TASK_DESCRIPTION, PRIORITY], function (err, result) {
            if (err) {
                console.log(err);
            }

            db.detach();
            res.json({ 'status': 'Inserted' });
        });
    });
};

// Getting one task by his id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(id);

    firebird.attach(connection, (err, db) => {
        if (err) console.log(err)

        db.query('SELECT id, task_name, task_description, priority, active FROM tasks WHERE id = ? ', [id], (err, result) => {

            if (err) {
                db.detach();
                res.status(400);
                console.log(err)
                return res.send(`\n${err.message}\n`);
            }

            let data = {}
            result.forEach(row => {
                let tempObj = {};
                Object.keys(row).forEach(el => {
                    tempObj[el] = convertBufferArray(row[el]);
                });
                data = tempObj;
            });

            res.json(data);

            db.detach();
        })
    });
};

// Update an task by his id
exports.update = (req, res) => {
    const ID = req.params.id;
    const { TASK_NAME, TASK_DESCRIPTION, PRIORITY } = req.body;
    console.table({ TASK_NAME, TASK_DESCRIPTION, PRIORITY });

    firebird.attach(connection, function (err, db) {
        if (err) throw err;

        db.query('UPDATE tasks SET task_name = ?, task_description = ? , priority = ? WHERE id = ?', [TASK_NAME, TASK_DESCRIPTION, PRIORITY, ID], function (err, result) {
            if (err) console.log(err);

            db.detach();

            res.json({
                'status': `Row ${ID} updated successfully!`
            });
        });
    });
};

// Inactivate an task
exports.delete = (req, res) => {
    const id = parseInt(req.params.id);

    firebird.attach(connection, (err, db) => {
        if (err) console.log(err)

        db.query('UPDATE tasks SET active = 0 WHERE id = ?', [id], (err, result) => {
            if (err) console.log(err)

            db.detach();
            res.json({
                'status': `Row ${id} deleted successfully!`
            });
        })
    });
};