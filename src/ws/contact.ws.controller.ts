import {Request} from "express";
import {WebSocket} from 'ws';

export function ContactWsController(ws: WebSocket, req: Request) {
    // New Web Socket Connection
    console.log("New websocket connection established")

    // Disconnect
    ws.on('close', () => console.log("Web socket connection closed"))

    // Receive
    ws.on('message', msg => {
        console.log(msg)

        //Send
        ws.send(`Server: ${msg}`);
    })


    // Send


}
