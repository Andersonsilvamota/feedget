import express from 'express';
import { routes } from './routes';

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('HTTP server running!');
})