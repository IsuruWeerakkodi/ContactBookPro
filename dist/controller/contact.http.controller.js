import { Router } from "express";
import mysql from 'mysql2/promise';
const controller = Router();
controller.get('/', getAllContacts);
controller.get('/:name', getContactByName);
controller.post('/', saveContact);
controller.patch('/:id', updateContact);
controller.delete('/:id', deleteContact);
export { controller as ContactHttpController };
const pool = mysql.createPool({
    database: 'contact_book_pro',
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    connectionLimit: 10
});
async function getAllContacts(req, res) {
    const connection = await pool.getConnection();
    const [contactlist] = await connection.execute('SELECT * FROM contacts');
    res.json(contactlist);
    pool.releaseConnection(connection);
}
async function getContactByName(req, res) {
    const name = req.params.name;
    if (!name)
        return res.status(400).json({ error: 'Name parameter required!' });
    const connection = await pool.getConnection();
    try {
        const [contact] = await connection.execute('SELECT * FROM contacts WHERE name = ?', [name]);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    }
    catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        if (connection) {
            pool.releaseConnection(connection);
        }
    }
}
async function saveContact(req, res) {
    const contact = req.body;
    const connection = await pool.getConnection();
    try {
        const [{ insertId }] = await connection.execute('INSERT INTO contacts(id, name, description, phone, email) VALUES (?, ?, ?, ?, ?)', [contact.id, contact.name, contact.description, contact.phone, contact.email]);
        contact.id = insertId;
        res.status(201).json(contact);
    }
    catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        if (connection) {
            pool.releaseConnection(connection);
        }
    }
}
async function updateContact(req, res) {
    const contactId = +req.params.id;
    const contact = req.body;
    const connection = await pool.getConnection();
    const result = await connection.execute('SELECT * FROM contacts WHERE id = ?', [contactId]);
    if (!result.length) {
        res.sendStatus(404);
        return;
    }
    else {
        await connection.execute('UPDATE contacts SET name = ?, description = ?, phone = ?, email = ? WHERE id=?', [contact.name, contact.description, contact.phone, contact.email, contactId]);
        res.sendStatus(204);
    }
    pool.releaseConnection(connection);
}
async function deleteContact(req, res) {
    const contactId = +req.params.id;
    const connection = await pool.getConnection();
    try {
        await connection.execute('DELETE FROM contacts WHERE id = ?', [contactId]);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete' });
    }
    finally {
        if (connection) {
            pool.releaseConnection(connection);
        }
    }
}
//# sourceMappingURL=contact.http.controller.js.map