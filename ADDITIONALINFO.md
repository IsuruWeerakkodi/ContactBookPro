## Additional informations on this app's components

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

### WebSocket
- Up to this stage, this app don't use Web Socket, but web socket connection is implemented for future developments of the app.
- 1. If an app use only NodeJS (no ExpressJS involvement) , websocket is implemented using [ws](https://www.npmjs.com/package/ws)
2. If an app use express (This app comes in this category), WebSocket must be implemented using [express-ws](https://www.npmjs.com/package/express-ws), which is a wrapper of [ws](https://www.npmjs.com/package/ws).
- Install [express-ws](https://www.npmjs.com/package/express-ws) and its type declarations
  ```bash
          npm i express-ws && npm i -D @types/express-ws
  ```
- Then, the app needed to be wrapped up with express-ws.
  ```import expressWs from "express-ws"```

  ```const app = expressWs(express()).app```
- As http.controller is implemented, ws.controller need to be implemented thereafter. WsHandler function need ```Request``` and ```WebSocket``` as implemented in this app.
- This is proposed to be used in future developments of this app.
 