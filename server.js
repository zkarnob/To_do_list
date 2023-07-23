const express = require('express');
const path = require('path');
const { displayTasks, addTask, editTask, deleteTask, getTaskName } = require('./database');

const app = express();
app.use(express.json());
app.use(express.static('./public'));

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'home.html'));
});

app.get('/edit/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'editPage.html'));
});

app.get('/tasks', (req, res) => {
  displayTasks()
    .then((val) => {
      const [row] = val;
      res.json(row);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

app.delete('/tasks/:id', (req, res) => {
  deleteTask(req.params.id)
    .then((val) => {
      console.log(val);
      res.send('Deleted successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

app.get('/tasks/:id', (req, res) => {
  getTaskName(req.params.id)
    .then((val) => {
      res.json(val[0][0]);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

app.post('/tasks', (req, res) => {
  const { taskId, taskName } = req.body;
  addTask(taskId, taskName)
    .then(() => {
      console.log(res);
      res.send('Added successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

app.put('/edit/:id', (req, res) => {
  const { taskId, taskName } = req.body;
  editTask(taskId, taskName)
    .then(() => {
      console.log('Edited');
      res.send('Edit Success');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server Error');
    });
});

const PORT = 9090;
app.listen(PORT, () => {
  console.log(`The Server started listening on port: ${PORT}...`);
});
