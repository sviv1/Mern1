import express from 'express'; 
import cors from 'cors';
import { adminRouter } from './Routes/AdminRoute.js';
import cookieParser from 'cookie-parser';



const app= express();
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/auth',adminRouter);
app.use('/uploads', express.static('server/uploads'));

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});

