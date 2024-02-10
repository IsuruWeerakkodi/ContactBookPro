"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskHttpController = void 0;
const express_1 = require("express");
const controller = (0, express_1.Router)();
exports.TaskHttpController = controller;
controller.get('/', getAllContacts);
controller.get('/:id', getContact);
controller.post('/', saveContact);
controller.patch('/:id', updateContact);
controller.delete('./:id', deleteContact);
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