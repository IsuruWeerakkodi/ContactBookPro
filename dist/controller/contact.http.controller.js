"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactHttpController = void 0;
const express_1 = require("express");
const promise_1 = __importDefault(require("mysql2/promise"));
const multer_1 = __importDefault(require("multer"));
const promises_1 = __importDefault(require("node:fs/promises"));
const path = __importStar(require("path"));
const controller = (0, express_1.Router)();
exports.ContactHttpController = controller;
const multipart = (0, multer_1.default)();
// multipart.none()
// multipart.single('field name') -> req.file
// multipart.array('field name') -> req.files
// multipart.any() -> req.files['field name']
controller.get('/', getAllContacts);
controller.get('/:name', getContactByName);
controller.post('/', multipart.single('picture'), saveContact);
controller.patch('/:id', multipart.any(), updateContact);
controller.delete('/:id', deleteContact);
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
    const connection = await pool.getConnection();
    try {
        const contact = req.body;
        const filePath = path.resolve('uploads', req.file?.originalname);
        await promises_1.default.writeFile(filePath, req.file?.buffer);
        const [result] = await connection.execute('INSERT INTO contacts(id, name, description, phone, email, picture) VALUES (?, ?, ?, ?, ?, ?)', [contact.id, contact.name, contact.description, contact.phone, contact.email, filePath]);
        const insertId = result.insertId;
        contact.id = insertId;
        res.status(201).json(contact);
    }
    catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Internal server error ' });
    }
    finally {
        pool.releaseConnection(connection);
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
        await connection.execute('UPDATE contacts SET name = ?, description = ?, phone = ?, email = ?, picture = ? WHERE id=?', [contact.name, contact.description, contact.phone, contact.email, contactId]);
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