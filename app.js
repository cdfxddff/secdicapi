const express = require('express');
const scr = require('./scr.js');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/',function(req,res){
    res.send('Working')
})

app.post('/',async function(req,res){
    const wm = await scr.search(req.body.a)
    res.json(wm)
})

var listener = app.listen(3000);