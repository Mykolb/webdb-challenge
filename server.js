const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

//router
const projectsRouter = require('./routes/projects-router')
const actionsRouter = require('./routes/actions-router')

const server = express();


server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

//endpoints and routes go here 
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>We have data showing!</h2>
    <p>I hope...</p>
    `)
});

module.exports = server;