import express, { json } from 'express';
import { ContactHttpController } from "./controller/contact.http.controller.js";
import cors from 'cors';
const app = express();
app.use(json());
app.use(cors());
app.use('/api/v1/contact', ContactHttpController);
app.listen(8080, () => console.log("Server is listening to 8080"));
//# sourceMappingURL=main.js.map