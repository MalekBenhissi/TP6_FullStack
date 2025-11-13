const express = require('express');  
const app = express();  
const PORT = 3000;  
app.use(express.json()); 
app.set('view engine', 'ejs');  
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`)); 
app.get('/', (req, res) => { res.render('index', { user: 'Student' }); }); 
let tasks = [
  { id: 1, title: 'Apprendre Express', done: false },
  { id: 2, title: 'Créer une application de démonstration', done: false },
  { id: 3, title: 'Tester lapplication', done: true },
];
app.get('/tasks', (req, res) => {
  res.render('tasks', { tasks });
});


// 1️⃣ GET : Récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// 2️⃣ POST : Ajouter une nouvelle tâche
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    done: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 3️⃣ PUT : Modifier une tâche (par ID)
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

  task.title = req.body.title ?? task.title;
  task.done = req.body.done ?? task.done;

  res.json(task);
});

// 4️⃣ DELETE : Supprimer une tâche (par ID)
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Tâche non trouvée' });

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});
app.use(express.static('public'));
