const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const app=express();
const arbolito= require('./routes/Arbol');

app.use(cors());
app.set('port',5000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(arbolito);
app.listen(app.get('port'),()=>{
    console.log('Server conectado en: ',app.get('port'));
})