const express = require('express');
const router = express.Router();
const Horse = require('../models/horseSchema.js')
const seedData = require('../models/seed_data.js')
// Routes
//___________________
router.get('/seed', (req, res) => {
    Horse.create(seedData, (err, data) => {
        res.redirect('/horses')
    })
})
router.get('/feed', (req, res) => {
  Horse.find({}, (err, allHorses) => {
    res.render('show-feed.ejs', {
    horses:allHorses
    }); 
  });
});
//localhost:3000
router.get('/', (req, res) => {
    Horse.find({}, (err, allHorses) => {
    res.render('index.ejs', {
      horses:allHorses
    });
  });
  });
  // render new
router.get('/new', (req, res) => {
    res.render('new.ejs')
  });
  // create new route
router.post('/', (req, res) => {
    if(req.body.turnOut === 'on') {
        req.body.turnOut = true;
    } else {
        req.body.turnOut = false;
    }
    Horse.create(req.body, (err, createdHorse) => {
      res.redirect('/horses');
    });
  });
  // show route
router.get('/:id', (req, res) => {
    Horse.findById(req.params.id, (err, foundHorse) => {
      res.render('show-horse.ejs', {
        horse:foundHorse
      });
    });
  });
  // edit route
router.get('/:id/edit', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    Horse.findByIdAndRemove(req.params.id, (err, deletedHorse) => {
      res.redirect('/horses');
    });
  });

module.exports = router;