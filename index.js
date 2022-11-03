const express = require('express');
const scr = require('./scr.js');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/',async function(req,res){
    console.log(req.body.a)
    const wm = await scr.search(req.body.a)
    res.json(wm)
})

var listener = app.listen(3000, function() {
    console.log(listener.address().port);
});