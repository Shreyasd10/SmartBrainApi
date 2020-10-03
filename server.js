const express =require('express');
const bodyParser =require('body-parser');
const bycrpt=require('bcrypt-nodejs');
const cors = require('cors');
const knex= require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
});

const app =express();

app.use(bodyParser.json());
app.use(cors())

const database = {
    users:[
    {
        id:'123',
        name:'shreyas',
        email:'shreyas@gmail.com',
        password:'cookies',
        entries:0,
        joined: new Date()
    },
    {
        id:'124',
        name:'saachi',
        email:'saachi@gmail.com',
        password:'icecream',
        entries:0,
        joined: new Date()  
    }
    ]
}

app.get('/', (req,res)=>{
    res.send("its working");
})
 
app.post('/signin', (req , res) => { signin.handleSignin (req,res,db,bycrpt) })

app.post('/register',(req,res) => { register.handleRegister (req,res,db,bycrpt) })

app.get('/profile/:id',(req,res) => { profile.handleProfileGet (req,res,db) })

app.put('/image',(req ,res)=> { image.handleImage (req,res,db) })

app.post('/imageUrl',(req ,res)=> { image.handleApiCall (req,res) })



app.listen(process.env.PORT || 3000,()=>{
    console.log(`App is running on port ${process.env.PORT}`);
})

