const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const mongoose=require('mongoose');
const { Socket } = require('engine.io');



const app=express();


const http =  require('http').createServer(app)

const PORT = process.env.PORT || 3000


app.use(express.static(__dirname + '/public'));


app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema={
    name:String,
    email:String,
    password:String,
    sport:String,
    food:String
};

const User=new mongoose.model('User',userSchema);

app.get('/',function(req,res){
    res.sendFile(__dirname+'/views/login.html')
})

app.get('/signup2',function(req,res){
    res.sendFile(__dirname+'/views/signup2.html');
})


app.post('/signup2',function (req,res) {
    const newUser= new User({
        name:req.body.first_name,
        email:req.body.username,
        password:req.body.password,
        sport:req.body.game,
        food:req.body.dish

    });
    newUser.save(function(err){
        if(err)
        console.log(err);
        else
        {
            
            User.find({food:req.body.dish,sport:req.body.game},function(err,user){
                res.render('chat',{
                    userlist:user,
                })
            })        
        }
    })
  })

  app.post('/login',function (req,res) {
   const username=req.body.username;
   const password=req.body.password;
   User.findOne({email:username},function(err,foundUser){
    if(err)
    console.log(err);
    else{
        if(foundUser){
            if(foundUser.password===password)
            {
                let ffood=foundUser.food
                User.find({food:foundUser.food,sport:foundUser.sport},function(err,user){
                    res.render('chat',{
                        userlist:user,
                        foods:ffood
                    })
                }) 
            }
            else{
            res.redirect('/');
            }           
        }
        
    }
   });
  })



app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
})

http.listen(PORT, () => {
    console.log(`Listen on the port ${PORT}`);
})

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log("Connected......");

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })

})


