
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

- The photos are saved as multipart form data in the uploads directory in the project, which is not included in the github 

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

## Special components of the app

  ### Data passing
  Data can be sent to this app using 3 types (Generally we use these 3 types to pass data through request)
  
  #### 1. JSON
  - Express has inbuilt middleware for JSON
  - We can ```import {json} form "express"``` ,  and use it where needed in the app by ``` app.use(json())```
  #### 2. X-www-form-urlencoded
  - For this also, we have inbuilt middleware with express
  - But, ```urlencoded``` by default use a deprecated directory named ```body-parser```.
  - So, we need to use new directory for this, named ```extended```
  - So we need to use ```app.use(urlencoded({extended:true}))``` where this is used in the app
  #### 3. multipart form data
  - There is no inbuilt middleware with express for this, so we need to install it externally. 
    - It is named [multer](https://www.npmjs.com/package/multer)
      
    ```bash
            npm i multer && npm i -D @types/multer
    ```

  ### Data Validation
  - Data validation can be done in node applications with decorations (called annotations in some languages) by [class-validator](https://www.npmjs.com/package/class-validator)
  - This can't be used with ecmascript, but with typescript.
  - Install it as follows
    ```bash
            npm i class-validator
    ```

  - Then set typescript configurations as follows.
    - In tsconfig.json under Languages and Environment,
      - experimental Decorators: true,
      - emitDecoratorMetadata: true
  - Use needed decorators in DTO (data transfer object) of your app
  - After adding decorators, to use it in a function to an object,
    ```await validateOrReject(object)```
  - Use try catch blocks as needed for error handling.

## Contributing

Contributions are welcome! Please open an issue or pull request for any improvements or fixes.

## License

This project is licensed under the [MIT License](LICENSE)

## Copyright
&copy; Isuru Weerakkodi 2024
www.isuruweerakkodi.com
