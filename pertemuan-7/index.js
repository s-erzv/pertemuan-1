const express = require('express');
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: 'Belajar JAVA', completed: false },
  { id: 2, task: 'FInal Project webdev janlup', completed: false }
];

app.get('/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
  
    if (!todo) {
      return res.status(404).json({ message: 'Todo ga ada' });
    }
  
    res.json(todo);
  });

app.get('/', (req, res) => {
  res.send('API ToDo nya dah jalan ges hehe');
});

// Update ToDo
app.put('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { task, completed } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo ga ada' });
  }

  if (task) todo.task = task;
  if (typeof completed === 'boolean') todo.completed = completed;

  res.json({ message: 'Todo udh diupdate y', todo });
});

// Hapus ToDo
app.delete('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Todo ga ada' });
  }

  todos.splice(index, 1);

  res.json({ message: 'Todo dah diapus' });
});

// Jalanin servernya
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

app.get('/todos', (req, res) => {
    res.json(todos);
  });
