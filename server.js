const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Sert les fichiers CSS, JS, images

// Vue EJS
app.set('view engine', 'ejs');

// ---- Routes ----

// 1️⃣ Page d'accueil
app.get('/', (req, res) => {
  res.render('index', { user: 'Malek Benhissi' });
});

// 2️⃣ Page About
app.get('/about', (req, res) => {
  res.render('about', { bio: "Je suis étudiant en Full Stack et j'apprends Express.js !" });
});

// 3️⃣ Page Contact
app.get('/contact', (req, res) => {
  res.render('contact', { email: "benhissimalek@gmail.com" });
});

// 4️⃣ Page Tasks
let tasks = [
  { id: 1, title: 'Apprendre Express', done: false },
  { id: 2, title: 'Créer une application de démonstration', done: false },
  { id: 3, title: 'Tester l’application', done: true },
];

app.get('/tasks', (req, res) => {
  res.render('tasks', { tasks });
});

// ---- API Tâches ----

// GET : Récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST : Ajouter une nouvelle tâche avec validation
app.post('/api/tasks', (req, res) => {
  const title = req.body.title?.trim();
  if (!title) {
    return res.status(400).json({ error: "Le titre ne peut pas être vide" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT : Modifier une tâche par ID
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

  task.title = req.body.title ?? task.title;
  task.done = req.body.done ?? task.done;

  res.json(task);
});

// DELETE : Supprimer une tâche par ID
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Tâche non trouvée' });

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

// ---- Serveur ----
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
