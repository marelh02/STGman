const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

//Mongoose schemas imports
let Intern=require("./intern.model");
let ServiceOCP=require("./service.model");
let SiteOCP=require("./site.model");
let Account=require("./account.model");

const mernRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mernFirst', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

////////////////////////////////////////////////Login API////////////////////////////////////////////////

mernRoutes.route('/register').post(function(req,res){
    let s=new Account(req.body);
    s.save()
        .then(account => {
            res.status(200).json({'account': 'account added successfully'});
        })
        .catch(err => {
            res.status(400).send("adding new account failed, try a different account name");
        });
});

mernRoutes.route('/login').post(function(req,res){
    let s=new Account(req.body);
    Account.findOne({_id:s._id},(err,account)=>{
        if(account){
           if(s.pwd === account.pwd){
               res.send("t")
           }else{
               res.send("f")
           }
        }else{
            res.send("f")
        }
    })
});

mernRoutes.route('/rmAccount/:id').delete(function(req, res) {
    Account.findByIdAndRemove(req.params.id, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

mernRoutes.route('/admin').get(function(req, res) {
    Account.findOne({_id:"admin"},(err,account)=>{
        if(account){
            res.send("t")
        }else{
            res.send("f")
        }
    })
});

mernRoutes.route('/accountsEx').get(function(req, res) {
    Account.find({_id:{$ne:"admin"}},(err,accounts)=>{
        if(err){
            console.log(err);
        }else{
            res.json(accounts);
        }
    })
});

////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////OCP sites database queries section////////////////////////////////////////////////////////////////
mernRoutes.route('/addSite').post(function(req,res){
    let s=new SiteOCP(req.body);
    s.save()
        .then(site => {
            res.status(200).json({'site': 'site added successfully'});
        })
        .catch(err => {
            res.status(400).send("adding new site failed");
        });
});

mernRoutes.route('/allSites').get(function(req, res) {
    SiteOCP.find(function(err, sites) {
        if (err) {
            console.log(err);
        } else {
            res.json(sites);
        }
    });
});

mernRoutes.route('/rmSite/:id').delete(function(req, res) {
    SiteOCP.findByIdAndRemove(req.params.id, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

mernRoutes.route('/rmAllSites').delete(function(req, res) {
    SiteOCP.deleteMany({}, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////OCP services database queries section////////////////////////////////////////////////////////////////
mernRoutes.route('/addService').post(function(req,res){
    let s=new ServiceOCP(req.body);
    s.save()
        .then(site => {
            res.status(200).json({'site': 'site added successfully'});
        })
        .catch(err => {
            res.status(400).send("adding new site failed");
        });
});

mernRoutes.route('/allServices').get(function(req, res) {
    ServiceOCP.find(function(err, sites) {
        if (err) {
            console.log(err);
        } else {
            res.json(sites);
        }
    });
});

mernRoutes.route('/specServices/:st').get(function(req, res) {
    ServiceOCP.find({site:req.params.st},function(err, sites) {
        if (err) {
            console.log(err);
        } else {
            res.json(sites);
        }
    });
});

mernRoutes.route('/rmService/:id').delete(function(req, res) {
    ServiceOCP.findByIdAndRemove(req.params.id, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

mernRoutes.route('/rmServicesBySite/:id').delete(function(req, res) {
    ServiceOCP.deleteMany({site:req.params.id}, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

mernRoutes.route('/rmAllServices').delete(function(req, res) {
    ServiceOCP.deleteMany({}, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////interns database queries section//////////////////////////////////////////////

mernRoutes.route('/addIntern').post(function(req,res){
    let intern=new Intern(req.body);
    intern.save()
        .then(intern => {
            res.status(200).json({'intern': 'intern added successfully'});
        })
        .catch(err => {
            res.status(400).send("adding new intern failed");
        });
});

mernRoutes.route('/allInterns').get(function(req, res) {
    Intern.find(function(err, interns) {
        if (err) {
            console.log(err);
        } else {
            res.json(interns);
        }
    });
});


mernRoutes.route('/intern/:id').get(function(req, res) {
    let id = req.params.id;
    Intern.findById(id, function(err, todo) {
        res.json(todo);
    });
});

//An id is imutable in mongodb
mernRoutes.route('/updateIntern/:id').post(function(req,res){

    Intern.findByIdAndUpdate(req.params.id,
        {"_id" : req.body._id,
        "fname" : req.body.fname,
        "name" : req.body.name,
        "sex" : req.body.sex,
        "cin" : req.body.cin,
        "school" : req.body.service,
        "service" : req.body.service,
        "site" : req.body.site,
        "mentor" : req.body.mentor,
        "startDate" : req.body.startDate,
        "duration" : req.body.duration,
        "endDate" : req.body.endDate},
         function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.json('Intern data updated!');
            //res.send(result);
        }

    })
})

mernRoutes.route('/rmIntern/:id').delete(function(req, res) {
    Intern.findByIdAndRemove(req.params.id, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

mernRoutes.route('/rmInternsBySite/:id').delete(function(req, res) {
    Intern.deleteMany({site:req.params.id}, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

mernRoutes.route('/rmInternsByService/:id').delete(function(req, res) {
    Intern.deleteMany({service:req.params.id}, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

mernRoutes.route('/rmAllInterns').delete(function(req, res) {
    Intern.deleteMany({}, function (err, result) {
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/interMan',mernRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});