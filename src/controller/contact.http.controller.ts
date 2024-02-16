import {Router} from "express";
import {Request, Response} from "express-serve-static-core";
import mysql, {ResultSetHeader} from 'mysql2/promise';
import {ContactDto} from "../dto/contact.dto";
import multer from "multer";
import fs from 'node:fs/promises';
import * as path from "path";
import {validateOrReject} from "class-validator";

const controller = Router();
const multipart = multer();

/*
there are inbuilt middleware for json and x-www-form-urlencoded
but not for multipart form data, so we install middleware named mulder and use it in app as below
*/

// multipart.none()
// multipart.single('field name') -> req.file
// multipart.array('field name') -> req.files
// multipart.any() -> req.files['field name']

controller.get('/', getAllContacts);
controller.get('/:name', getContactByName);
controller.post('/', multipart.single('picture'), saveContact);
controller.patch('/:id', multipart.any(), updateContact);
controller.delete('/:id', deleteContact);
export {controller as ContactHttpController};

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
    const name = req.params.name;
    if (!name) return res.status(400).json({error: 'Name parameter required!'})
    const connection = await pool.getConnection();
    try{

        const [contact] = await connection.execute('SELECT * FROM contacts WHERE name = ?', [name]);
        if (!contact){
            return res.status(404).json({error: 'Contact not found'});
        }
        res.json(contact)
    }catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) {
            pool.releaseConnection(connection);
        }
    }
}
async function saveContact(req: Request, res: Response) {
    const connection = await pool.getConnection();

    function getExtension(filename: string | undefined): string {
        if (!filename) return '';
        const parts = filename.split('.');
        return parts[parts.length - 1];
    }


    try {
        const contact = Object.assign(new ContactDto(), req.body);
        await validateOrReject(contact);

        const filePath = path.resolve('uploads', `${contact.id}.${getExtension(req.file?.originalname!)}');
        await fs.writeFile(filePath, req.file?.buffer!);


        const [result] = await connection.execute<ResultSetHeader>(
            'INSERT INTO contacts(id, name, description, phone, email, picture) VALUES (?, ?, ?, ?, ?, ?)',
            [contact.id, contact.name, contact.description, contact.phone, contact.email, filePath]
        );
        const insertId = result.insertId;
        contact.id = insertId;

        res.status(201).json(contact);
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Internal server error ' });
    } finally {

        pool.releaseConnection(connection);

    }
}

async function updateContact(req:Request, res:Response) {
    const contactId = +req.params.id;
    const contact =<ContactDto> req.body;
    const connection =await pool.getConnection();
    const result = await connection.execute('SELECT * FROM contacts WHERE id = ?', [contactId]);
    if (!result.length){
        res.sendStatus(404);
        return;
    }
    else{
        await connection.execute
            ('UPDATE contacts SET name = ?, description = ?, phone = ?, email = ?, picture = ? WHERE id=?',
                [contact.name, contact.description, contact.phone, contact.email,  contactId]);
        res.sendStatus(204);
    }
    pool.releaseConnection(connection);
}
async function deleteContact(req:Request, res:Response) {
    const contactId = +req.params.id;
    const connection = await pool.getConnection();
    try {
        await connection.execute('DELETE FROM contacts WHERE id = ?', [contactId]);
        res.sendStatus(204);
    } catch (error){
        res.status(500).json({error: 'Failed to delete'});
    } finally {
        if (connection){
            pool.releaseConnection(connection);
        }
    }
}