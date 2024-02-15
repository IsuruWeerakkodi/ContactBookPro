"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactTO = void 0;
class ContactTO {
    id;
    name;
    description;
    phone;
    email;
    picture;
    constructor(id, name, description, phone, email, picture) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.phone = phone;
        this.email = email;
        this.picture = picture;
    }
}
exports.ContactTO = ContactTO;
// Use Buffer type for binary data
//const contact = new ContactTO(1, 'John Doe', 'Description', '1234567890', 'john@example.com', Buffer.from('binary_data'));
//# sourceMappingURL=contact.to.js.map