import {Router} from "express";
import {Request, Response} from "express-serve-static-core";
import mysql, {ResultSetHeader} from "mysql2/promise";
import {ContactTO} from "../to/contact.to";

const controller = Router();

controller.get('/', getAllContacts);
controller.get('/:id', getContact);
controller.post('/', saveContact);
controller.patch('/:id', updateContact);
controller.delete('./:id', deleteContact)
export {controller as TaskHttpController};

function getAllContacts() {
}
function getContact() {

}
function saveContact() {

}
function updateContact() {

}
function deleteContact() {
}