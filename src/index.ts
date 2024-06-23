import express from "express";
import { createServer } from 'node:http';
import cors from 'cors';

import { jwt_middleware } from './auth/authenticate';
import { join } from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const PORT = process.env.PORT || 6789;
const app = express();
const server = createServer(app);


const profileRoutes = require('./routes/profile');
const postRouter = require('./routes/post');
const sse = require('./sse/sse');



app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(jwt_middleware)
// app.use(morgan('combined'));

app.use('/sse', sse);
app.use('/profile', profileRoutes);
app.use('/post', postRouter)


//Directories initialization
const uploads = join(__dirname, '..', 'uploads');
const pfp = join(uploads, 'pfp');

try {
    if(!existsSync(uploads)) {
        mkdirSync(uploads);
        mkdirSync(pfp);
    } else {
        if(!existsSync(pfp)) {
            mkdirSync(pfp);
        }
    }
} catch (error) {
    console.log('error while creating directories');
    console.log(error);
    
}


server.listen(PORT, ()=>{
    console.log('listning on port', PORT);    
})
