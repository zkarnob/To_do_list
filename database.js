const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

async function displayTasks() {
  try {
    const sql = `SELECT * FROM tasks ORDER BY timestamp_column ASC;`;
    return await pool.query(sql);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addTask(taskId, taskName) {
  try {
    const sql = `INSERT INTO tasks(taskId, taskName) VALUES (?, ?)`;
    return await pool.query(sql, [taskId, taskName]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteTask(taskId) {
  try {
    const sql = `DELETE FROM tasks WHERE taskId = ?`;
    return await pool.query(sql, taskId);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function editTask(taskId, taskName) {
  try {
    const sql = `UPDATE tasks SET taskName = ? WHERE taskId = ?`;
    return await pool.query(sql, [taskName, taskId]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getTaskName(id) {
  try {
    const sql = `SELECT taskName FROM tasks WHERE taskId = ?`;
    return await pool.query(sql, id);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  displayTasks,
  addTask,
  editTask,
  deleteTask,
  getTaskName,
};
