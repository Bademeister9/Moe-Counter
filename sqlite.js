const path = require('path');
const Database = require('better-sqlite3');
const db = new Database(path.resolve(__dirname, './count.db'));

db.exec(`CREATE TABLE IF NOT EXISTS tb_count (
    id    INTEGER      PRIMARY KEY AUTOINCREMENT
                       NOT NULL
                       UNIQUE,
    name  VARCHAR (32) NOT NULL
                       UNIQUE,
    num   BIGINT       NOT NULL
                       DEFAULT (0) 
);`);

function getNumberByName(name) {
    const req = db.prepare('SELECT num FROM tb_count WHERE name = ?');
    const result = req.get(name);
    return result ? result.num : null;
}

function incrementNumByName(name) {
    const currentNum = getNumberByName(name);
    if (currentNum !== null) {
        const newNum = currentNum + 1;
        const updateData = db.prepare('UPDATE tb_count SET num = ? WHERE name = ?');
        updateData.run(newNum, name);
        return newNum;
    }
    return null;
}

function createObjectByName(name) {
    const insertData = db.prepare("INSERT INTO tb_count (name, num) VALUES (?, 0)");
    insertData.run(name);
}
function cleanInput(input) {
    if (/[^a-zA-Z0-9]/.test(input)) {
        return 0;
    }
    return input;
}


module.exports = {
    getNumberByName,
    incrementNumByName,
    createObjectByName,
    cleanInput
};
