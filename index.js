const { log } = require('console');
const express = require('express');
const app=express();
const fs=require('fs')
const path = require('path');

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine', 'ejs');


app.get("/", function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index", {files: files});
    })
    
});

app.get("/file/:filename", function(req,res){
    fs.readFile(`./files/${req.params.filename}`,'utf-8', function(err, filedata){
        res.render('show', {filename: req.params.filename, filedata: filedata})
    })
});

app.post("/create", function(req,res){
   console.log(req.body)
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
    res.redirect('/')
})
    
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});