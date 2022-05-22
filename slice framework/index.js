const { request, response } = require("express");
const express = require("express"); 
const fs = require("fs")
const path = require("path")
const ejs = require("ejs")

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname)));

app.get('/', (request, response) => {              
    fs.readFile('views/introduction.html', 'utf-8', (err, html) =>{
        if (err){
            response.status(500).send('sorry, server out of service');
        }        
        response.send(html);
    })
});

app.get('/get-started', (request, response) => {              
    fs.readFile('views/getstarted.html', 'utf-8', (err, html) =>{
        if (err){
            response.status(500).send('sorry, server out of service');
        }        
        response.send(html);
    })
});

app.get('/t', (request, response) => {              
    fs.readFile('views/t.html', 'utf-8', (err, html) =>{
        if (err){
            response.status(500).send('sorry, server out of service');
        }        
        response.send(html);
    })
});

app.get('/feedback', (request, response) => {              
    fs.readFile('views/feedback.html', 'utf-8', (err, html) =>{
        if (err){
            response.status(500).send('sorry, server out of service');
        }        
        response.send(html);
    })
});

app.listen(process.env.PORT || 6969, () => console.log("App Available now"));
