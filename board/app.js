const express = require('express');
const app = express();
const fetch = require('node-fetch');
const {TextDecoder, TextEncoder} = require('util');

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', function(req,res){
    res.render('index');
})














app.listen(10080, () => {
    console.log('Server is running..')
})