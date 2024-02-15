import path from "node:path";

export class ContactTO{
    constructor( public id: number,
                 public name: string,
                 public description:string,
                 public phone: string,
                 public email:string,
                 public picture:string) {
    }
}

// Use Buffer type for binary data
//const contact = new ContactTO(1, 'John Doe', 'Description', '1234567890', 'john@example.com', Buffer.from('binary_data'));