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



//GET  all projects
//working-returned empty []
router.get('/', (req, res) => {
    db('projects') //has to be the same name as the table name 
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'Projects could not be found'})
    })
})

//add a project
//working
router.post('/', (req, res) => {
  db('projects')
  .insert(req.body, 'name')
  .then(id => {
      res.status(201).json(id)
  })
  .catch(err => {
      res.status(500).json({ error: err, message: 'There was an error creating the project'})
  })
})



 //Get projects by id and return actions with it 
 //working
 //  .where({id: req.params.id}) wouldn't work...had to deconstruct it and try that way...weird
 //
 // 
 //projects is returning actions array
 //project_id is equal to id on the projects table
 //calling it projects.actions = actions like a join where you would say cohort.cohort_id = id 

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('projects')
  .where({id: req.params.id})
  .first()
  .then(projects => {
    db('actions')
    .where({ project_id: id})
    .then(actions => {
      projects.actions = actions;
        res.status(200).json(projects);
    })
  
     })
    .catch(err => {
      res.status(500).json({ error: err.message})
      //id is not defined 
 })
})

//UPDATE Projects
//Working
router.put('/:id', (req, res) => {
  db('projects')
  .where({ id: req.params.id})
  .update(req.body)
  .then(project => {
      if(project === 0) {
          res.status(404).json({ message: 'The projects associated with this id cannot be found' }); 
      } else {
          res.status(201).json(project)
      }
  })
  .catch(err => {
      res.status(500).json({ error: err, message: 'There was an error updating the project data'})
  })
})


//DELETE projects
//WORKING 
router.delete('/:id', (req, res) => {
  db('projects')
  .where({ id: req.params.id})
  .del()
  .then(project => {
      if(project === 1) {
          res.status(200).end()
      }
  })
  .catch(error => {
      res.status(500).json({ error: err, message: 'There was an error deleting the project data'})
  })
})








module.exports = router;