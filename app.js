const express=require('express');
const app=express();
const bodyParser=require('body-parser')
//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const apiroute=require('./routes/apiroute');

app.use('/',apiroute);
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on the https://localhost/${PORT}`)
})