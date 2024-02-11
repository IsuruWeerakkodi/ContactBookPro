import {Router} from "express";
import {Request, Response} from "express-serve-static-core";
import mysql, {ResultSetHeader} from 'mysql2/promise';
import {ContactTO} from "../to/contact.to";

const controller = Router();

controller.get('/', getAllContacts);
controller.get('/:id', getContactByName);
controller.post('/', saveContact);
controller.patch('/:id', updateContact);
controller.delete('./:id', deleteContact)
export {controller as TaskHttpController};

const pool = mysql.createPool({
    database: 'contact_book_pro',
    port:3306,
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    connectionLimit:10
})

async function getAllContacts(req:Request, res:Response) {
    const connection = await pool.getConnection();
    const [contactlist] = await connection.execute('SELECT * FROM contacts');
    res.json(contactlist);
    pool.releaseConnection(connection);
}
async function getContactByName(req:Request, res:Response) {
    if (!req.query.name) res.sendStatus(400)
    const connection = await pool.getConnection();
    const [contact] = await connection.execute('SELECT * FROM contacts WHERE name = ?', req.query.name);
    res.json(contact);
    pool.releaseConnection(connection);
}
async function saveContact(req:Request, res:Response) {
    const contact = <ContactTO> req.body;
    const connection = await pool.getConnection();
    const [{insertId}] = await connection.execute<ResultSetHeader>
        ('INSERT INTO contacts(id, name, description, phone, email) VALUES (?, ?, ?, ?, ?)',
            [contact.id, contact.name, contact.description, contact.phone, contact.email]);
    pool.releaseConnection(connection);
    contact.id = insertId;
    res.status(201).json(contact);
}
async function updateContact(req:Request, res:Response) {
    const contactId = +req.params.id;
    const contact =<ContactTO> req.body;
    const connection =await pool.getConnection();
    const result = await connection.execute('SELECT * FROM contacts WHERE id = ?', [contactId]);
    if (!result.length){
        res.sendStatus(404);
        return;
    }
    else{
        await connection.execute
            ('UPDATE contacts SET name = ?, description = ?, phone = ?, email = ?',
                [contact.name, contact.description, contact.phone, contact.email]);
        res.sendStatus(204);
    }
    pool.releaseConnection(connection);
}
async function deleteContact(req:Request, res:Response) {
    const contactId = +req.params.id;
    const contact =<ContactTO> req.body;
    const connection = await pool.getConnection();
    const result = await connection.execute('SELECT * FROM contacts WHERE id = ?', [contactId]);
    if (!result.length){
        res.sendStatus(404);
        return;
    }else {
        await connection.execute('DELETE FROM contacts WHERE id = ?', [contactId]);
    }
    pool.releaseConnection(connection);
}