"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskHttpController = void 0;
const express_1 = require("express");
const promise_1 = __importDefault(require("mysql2/promise"));
const controller = (0, express_1.Router)();
exports.TaskHttpController = controller;
controller.get('/', getAllContacts);
controller.get('/:id', getContactByName);
controller.post('/', saveContact);
controller.patch('/:id', updateContact);
controller.delete('./:id', deleteContact);
const pool = promise_1.default.createPool({
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
    if (!req.query.name)
        res.sendStatus(400);
    const connection = await pool.getConnection();
    const [contact] = await connection.execute('SELECT * FROM contacts WHERE name = ?', req.query.name);
    res.json(contact);
    pool.releaseConnection(connection);
}
async function saveContact(req, res) {
    const contact = req.body;
    const connection = await pool.getConnection();
    const [{ insertId }] = await connection.execute('INSERT INTO contacts(id, name, description, phone, email) VALUES (?, ?, ?, ?, ?)', [contact.id, contact.name, contact.description, contact.phone, contact.email]);
    pool.releaseConnection(connection);
    contact.id = insertId;
    res.status(201).json(contact);
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
        await connection.execute('UPDATE contacts SET name = ?, description = ?, phone = ?, email = ?', [contact.name, contact.description, contact.phone, contact.email]);
        res.sendStatus(204);
    }
    pool.releaseConnection(connection);
}
async function deleteContact(req, res) {
    const contactId = +req.params.id;
    const contact = req.body;
    const connection = await pool.getConnection();
    const result = await connection.execute('SELECT * FROM contacts WHERE id = ?', [contactId]);
    if (!result.length) {
        res.sendStatus(404);
        return;
    }
    else {
        await connection.execute('DELETE FROM contacts WHERE id = ?', [contactId]);
    }
    pool.releaseConnection(connection);
}
//# sourceMappingURL=contact.http.controller.js.map