const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const fs = require('fs');
const mongoose = require('mongoose');

const witsRoutes = express.Router();

let Interactions=require("./witsModels/Interactions.model")
let User=require("./witsModels/User.model")
let Comment=require("./witsModels/Comment.model")
let Article=require("./witsModels/Article.model")
let ArticleDescription=require("./witsModels/ArticleDescription.model")

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

mongoose.connect('mongodb://127.0.0.1:27017/wits', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

const dbPath="C:\\Users\\Marouane\\Desktop\\EMI 2éme A1P\\promises"

//////////////////////////////////Ces fcts retournent un tableau vide si aucun résultat////////////////////////////////////////////

function multipleDescFilesDataFetcher() {
  const descriptionregex=new RegExp("desc_.*\.json")
    return fs.readdirSync(dbPath)
    .filter(x=>descriptionregex.test(x))
    .map(x=>JSON.parse(fs.readFileSync(dbPath+"\\"+x,'utf8')))
  
  }

  function myDescFilesDataFetcher(id) {
    const mydescriptionregex=new RegExp(`desc_${id}_.*\.json`)
    return fs.readdirSync(dbPath)
    .filter(x=>mydescriptionregex.test(x))
    .map(x=>JSON.parse(fs.readFileSync(dbPath+"\\"+x,'utf8')))
  
  }

//////////////////////////////////////////////////////////////////////////////

witsRoutes.route('/saveArticle').post(function(req,res){
    let s=req.body;
    fs.writeFile(dbPath+"\\"+s.articleID+".json", JSON.stringify(s), (err) => {
        if (err) {        
          console.error(err);
        }
    });
    console.log("New article saved "+s.articleID);

    const a =new Interactions({
      articleId:s.articleID,
    likes:[],
    comments:[]
    })
    a.save().then(
      ()=>{
        res.end()
      }
    )
    // let x=new Article(req.body)
    // x.save()
    // .then(y => {
    //   console.log("new article here man");
    //     res.status(200).end();
    // })
    // .catch(err => {
    //   console.log("failed to save the article man");
    //   console.log(err);
    //     res.status(400).end();
    // });
});

witsRoutes.route('/saveDescription').post(function(req,res){
    let s=req.body;
    fs.writeFile(dbPath+'\\desc_'+s.articleID+".json", JSON.stringify(s), (err) => {
        if (err) {            
          console.error(err);
        }
    });
        console.log("New article description saved desc_"+s.articleID);
    res.end()    
    // let x=new ArticleDescription(req.body)
    // x.save().then(y => {
    //   console.log("new description here man");
    //     res.status(200).end();
    // })
    // .catch(err => {
    //     res.status(400).end();
    // });
});

witsRoutes.route('/getArticle/:articleID').get(function(req,res){
    let id_article=req.params.articleID
    fs.readFile(dbPath+"\\"+id_article+".json", 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(data);
        console.log("Article "+id_article+" sent");
      });
});

witsRoutes.route('/getMyArticlesDescriptions/:userID').get(function(req,res){
  let id=req.params.userID
  let data=myDescFilesDataFetcher(id)
  res.send(JSON.stringify(data));
  console.log(`All articles descriptions of ${id} sent`);
});

witsRoutes.route('/getArticlesDescriptions').get(function(req,res){
  let data=multipleDescFilesDataFetcher()
  res.send(JSON.stringify(data));
  console.log("All articles descriptions sent");
});

witsRoutes.route('/rmArticle/:id').delete(function(req, res) {
  console.log("Delete request received");
  let id=req.params.id
  const descriptionregex=new RegExp(".*"+id+".*")
  fs.readdirSync(dbPath)
    .filter(x=>descriptionregex.test(x))
    .map(x=>{
      console.log("file deleted: "+x);
      fs.unlinkSync(dbPath+"\\"+x)
    })
    res.end()   
});

witsRoutes.route('/updateArticle').put(function(req,res){
  let s=req.body;
  fs.writeFile(dbPath+"\\"+s.articleID+".json", JSON.stringify(s), (err) => {
      if (err) {        
        console.error(err);
      }
  });
  console.log("Article updated: "+s.articleID);
  res.end()
});

witsRoutes.route('/updateDescription').put(function(req,res){
  let s=req.body;
  fs.writeFile(dbPath+'\\desc_'+s.articleID+".json", JSON.stringify(s), (err) => {
      if (err) {            
        console.error(err);
      }
  });
  console.log("Description updated: "+s.articleID);
  res.end()    
});

//////////////////////////////////// Les end-points des comptes /////////////////////////////////////////

witsRoutes.route('/register').post(function(req,res){
  let s=new User(req.body);
  s.save()
      .then(account => {
          res.status(200).json({'_id': s._id});
      })
      .catch(err => {
          res.status(400).send("registering failed man");
      });
});

witsRoutes.route('/login').post(function(req,res){
  let s=new User(req.body);
  User.findOne({email:s.email},(err,account)=>{
      if(account){
         if(s.password === account.password){
             res.send(account._id)
         }else{
             res.send(null)
         }
      }else{
          res.send(null)
      }
  })
});

witsRoutes.route('/fullName/:id').get(function(req, res) {
  let id=req.params.id
  User.findById(id, function (err, user) {
    if(user){
      res.send({fullName:user.fullName})
    }
    else res.status(400).send(null)
  });
});

//////////////////////////////////////////////////////////////////////

////////////////////////////////// Les end-points des intéractions ///////////////////////////////////////////

witsRoutes.route('/articleInteractions/:id').get(function(req,res){
  let id=req.params.id
  Interactions.findOne({_id:id},(err,interactions)=>{
    if(interactions){
      res.json(interactions);
    }else{
      console.log(err);
    }
})
});

witsRoutes.route('/commentArticle/:id').post(function(req,res){
  let id=req.params.id
  let s=new Comment(req.body);
  Interactions.findOne({_id:id},(err,interactions)=>{
    if(interactions){
      res.json(interactions);
    }else{
      console.log(err);
    }
})
});

witsRoutes.route('/reply').post(function(req,res){
  let s=new Interactions(req.body)
  s.save()
  .then(account => {
      res.status(200);
  })
  .catch(err => {
      res.status(400);
  });
});

witsRoutes.route('/comment').post(function(req,res){
  let s=new Interactions(req.body)
  s.save()
  .then(account => {
      res.status(200);
  })
  .catch(err => {
      res.status(400);
  });
});

//////////////////////////////////////////////////////////////////////////////

app.use('/witsTest',witsRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});