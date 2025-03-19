import express from 'express';
import routes from './routes/routes.js';
import cors from "cors";
import morgan from "morgan";



const app = express();
app.set('port', 8087)

// Middlewares
app.use(cors({ origin:"*"}));
app.use(morgan("dev"));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);


export default app;