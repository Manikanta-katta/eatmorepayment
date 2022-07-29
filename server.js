const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config();

const Stripe = require('Stripe')(process.env.SECRET_KEY);
var cors = require('cors');


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port,error =>{
    if(error) throw error;
    console.log('Your server is running on port 3000');
});

app.post('/payment', async (req,res)=>{
    let status, error;
    const {token,amount} = req.body;
    console.log(token);
})