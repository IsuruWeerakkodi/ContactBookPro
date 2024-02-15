import express, {json, urlencoded} from 'express';
import {ContactHttpController} from "./controller/contact.http.controller.js"
import cors from 'cors';

const app = express();
app.use(json());
app.use(urlencoded({extended:true}));
app.use(cors());

app.use('/api/v1/contact', ContactHttpController)

app.listen(8080, ()=> console.log("Server is listening to 8080"))

