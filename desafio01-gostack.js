const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function checkProjectExists(req, res, next){
    const {id} = req.params;
    const project = projects.find(p => p.id == id);

    if(!project){
        return res.status(400).json({Error: 'Project not found!'});
    }

    return next();
}

function logRequests(req, res, next){
    console.count("Numero de requisições");

    return next();
}

server.use(logRequests)

server.get('/projects', (req, res) =>{
    return res.json(projects);
});

server.post('/projects', (req, res) =>{
    const { id, title } = req.body;

    const project = {
        id,
        title,
        task: []
    }
    projects.push(project);
    return res.json(projects);
});


server.put('/projects/:id', checkProjectExists, (req, res) =>{
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(project);
});

server.delete('/projects/:id', checkProjectExists, (req, res)=>{
    const {id} = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);

    return res.send();
});

server.post('/projects/:id/taks', checkProjectExists, (req, res) =>{
    const {id} = req.params;
    const {title} = req.body;

    const project = projects.find(p => p.id == id);

    project.taks.push(title);

    return res.json(project);
});



server.listen(3001);
