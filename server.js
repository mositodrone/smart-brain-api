const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const app = express();
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/register');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
     connectionString : process.env.DATABASE_URL,
       ssl: true,
    }
});


app.use(bodyParser.json());
app.use(cors())
app.get('/', (req, res) => { res.send('it is working!'); })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => {image.handleImageEntries(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res, )})

// bcrypt.hash('bacon', null, null, function(err, hash) {
// 	console.log(hash);
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is runnning on port ${process.env.PORT}`)
})

/*
/ --> res = this is working
/signin --> post = success/fail
/register --> post = user
/profile/:userId --> get = user
/image --> put --> user 

*/