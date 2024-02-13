
# Contact Book Pro

Contact Book Pro is a simple Node.js application that provides HTTP endpoints to manage contacts.

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
cd ContactBookPro
```

2. Install dependencies:

```bash
npm install
```

3. Configure the database:

   - Update the database configuration in \`index.ts\` file to match your MySQL database settings.

4. Start the server:

```bash
npm start
```

## Usage

The application provides the following HTTP endpoints to manage contacts:

- **GET /api/v1/contact**: Retrieve all contacts.
- **GET /api/v1/contact/:name**: Retrieve a contact by name.
- **POST /api/v1/contact**: Save a new contact.
- **PATCH /api/v1/contact/:id**: Update an existing contact by ID.
- **DELETE /api/v1/contact/:id**: Delete a contact by ID.

### Request and Response Formats

- **GET /api/v1/contact**:
  - Request: None
  - Response: An array of contacts in JSON format.

- **GET /api/v1/contact/:name**:
  - Request: URL parameter \`name\` specifying the name of the contact.
  - Response: The contact object in JSON format, or an error message if the contact is not found.

- **POST /api/v1/contact**:
  - Request: Contact object in JSON format in the request body.
  - Response: The saved contact object in JSON format, or an error message if the save operation fails.

- **PATCH /api/v1/contact/:id**:
  - Request: URL parameter \`id\` specifying the ID of the contact to update, and the contact object in JSON format in the request body.
  - Response: Status code 204 No Content if the update is successful, or an error message if the contact is not found or the update operation fails.

- **DELETE /api/v1/contact/:id**:
  - Request: URL parameter \`id\` specifying the ID of the contact to delete.
  - Response: Status code 204 No Content if the deletion is successful, or an error message if the contact is not found or the delete operation fails.

## Contributing

Contributions are welcome! Please open an issue or pull request for any improvements or fixes.

## License

This project is licensed under the [MIT License](LICENSE)

## Copyright
&copy; Isuru Weerakkodi 2024
www.isuruweerakkodi.com
