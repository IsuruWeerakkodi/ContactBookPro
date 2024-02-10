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
controller.get('/:id', getContact);
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
//# sourceMappingURL=contact.http.controller.js.map