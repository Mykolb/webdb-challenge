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
router.get('/', (req, res) => {
    db('projects') //has to be the same name as the table name 
    .then(projects => {
        console.log('projects')
        res.status(200).json(projects)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'Projects could not be found'})
    })
})

//add a project
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
router.get('/:id', (req, res) => {
  db('projects')
  .where({id: req.params.id})
  .first()
  .then(projects => {
    db('actions')
    .where({ project_id: id})
    console.log(id)
    .then(actions => {
      (projects.actions = actions);
       return res.status(200).json(projects);
    })
  
     })
    .catch(err => {
      res.status(500).json({ error: err, message: 'There was an error returning the projects'})
 })
})



module.exports = router;