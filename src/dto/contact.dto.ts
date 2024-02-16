import {IsNotEmpty, Matches} from "class-validator";

export class ContactDto {
    @IsNotEmpty()
    id!: number;

    @IsNotEmpty()
    name!: string;

    description!:string;

    @IsNotEmpty()
    @Matches(/^\d{3}-\d{7}$/)
    phone!: string;

    @IsNotEmpty()
    @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    email!:string;

    picture!:string

}

// Use Buffer type for binary data
//const contact = new ContactDto(1, 'John Doe', 'Description', '1234567890', 'john@example.com', Buffer.from('binary_data'));