import express, {json, urlencoded} from 'express';
import expressWs from "express-ws";
import {ContactHttpController} from "./controller/contact.http.controller.js"
import {ContactWsController} from "./ws/contact.ws.controller.js"
import cors from 'cors';

const app = expressWs(express()).app;

app.use(json());
app.use(urlencoded({extended:true}));
app.use(cors());

app.use('/api/v1/contact', ContactHttpController)
app.ws('/api/v1/contact', ContactWsController)

app.listen(8080, ()=> console.log("Server is listening to 8080"))

