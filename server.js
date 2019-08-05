console.log(process.env.MONGODB_URI)

//___________________
//Dependencies
//___________________
const express = require('express');
const app = express();
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const Horse = require('./models/horseSchema.js')
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  {useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//___________________
// Routes
//___________________
//localhost:3000
app.get('/horses', (req, res) => {
  Horse.find({}, (err, allHorses) => {
  res.render('index.ejs', {
    horses:allHorses
  });
});
});
// render new
app.get('/horses/new', (req, res) => {
  res.render('new.ejs')
});
// create new route
app.post('/horses', (req, res) => {
  Horse.create(req.body, (err, createdHorse) => {
    res.redirect('/horses');
  });
});
// show route
app.get('/horses/:id', (req, res) => {
  Horse.findById(req.params.id, (err, foundHorse) => {
    res.render('show-horse.ejs', {
      horse:foundHorse
    });
  });
});
// edit route
app.get('/horses/:id/edit', (req, res) => {
  Horse.findById(req.params.id, (err, foundHorse) => {
   res.render(
    'edit-horse.ejs',
    {
      horse:foundHorse
    }
    );
  }); 
});
// update
app.put('/horses/:id', (req, res) => {
  if(req.body.turnOut === 'on') {
    req.body.turnOut = true;
} else {
    req.body.turnOut = false;
}
  Horse.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedHorse) => {
    res.redirect('/horses')
  });
});
// delete
app.delete('/horses/:id', (req, res) => {
  Horse.findByIdAndRemove(req.params.id, (err, deletedHorse) => {
    res.redirect('/horses');
  });
});
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

mongoose.connect('mongodb://localhost:27017/horses', { useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});