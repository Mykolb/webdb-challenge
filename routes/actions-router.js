const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/sprint.db3',
    },
    useNullAsDefault: true, // needed for sqlite
  };

const db = knex(knexConfig);


//GET 
//Working
router.get('/', (req, res) => {
    db('actions') //has to be the same name as the table name 
    .then(actions => {
        console.log('actions')
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'Actions could not be found'})
    })
})

//add action
//working
router.post('/', (req, res) => {
  db('actions')
  .insert(req.body, 'name')
  .then(id => {
      res.status(201).json(id)
  })
  .catch(err => {
      res.status(500).json(err.message)
  })
})

//UPDATE ACTIONS
//WORKING
router.put('/:id', (req, res) => {
  db('actions')
  .where({ id: req.params.id})
  .update(req.body)
  .then(action => {
      if(action === 0) {
          res.status(404).json({ message: 'The action associated with this id cannot be found' }); 
      } else {
          res.status(201).json(action)
      }
  })
  .catch(err => {
      res.status(500).json({ error: err, message: 'There was an error updating the action data'})
  })
})

//DELETE actions
//WORKING
router.delete('/:id', (req, res) => {
  db('actions')
  .where({ id: req.params.id})
  .del()
  .then(action => {
      if(action === 1) {
          res.status(200).end()
      }
  })
  .catch(error => {
      res.status(500).json({ error: err, message: 'There was an error deleting the project data'})
  })
})





module.exports = router;