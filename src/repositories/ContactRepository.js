const db = require('../config/database');

const findAll = async () => {
    const [rows] = await db.execute('SELECT id, name, phone FROM contacts');
    return rows;
};

const findById = async (id) => {
    const [rows] = await db.execute('SELECT id, name, phone FROM contacts WHERE id = ?', [id]);
    return rows[0];
};

const create = async (contact) => {
    const { name, phone } = contact;
    const [result] = await db.execute(
        'INSERT INTO contacts (name, phone) VALUES (?, ?)',
        [name, phone]
    );
    return result.insertId;
};

const update = async (id, contact) => {
    const { name, phone } = contact;
    await db.execute(
        'UPDATE contacts SET name = ?, phone = ? WHERE id = ?',
        [name, phone, id]
    );
};

const remove = async (id) => {
    await db.execute('DELETE FROM contacts WHERE id = ?', [id]);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};