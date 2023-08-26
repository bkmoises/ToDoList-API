const connection = require('./connection');

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const createTasks = async (task) => {
  const { title } = task;
  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';

  const [createdTask] = await connection.execute(query, [title, 'Pendente', dateUTC]);
  return { insertId: createdTask.insertId };
};

const deleteTasks = async (id) => {
  const query = 'DELETE FROM tasks WHERE id = ?';

  const deletedTask = await connection.execute(query, [id]);
  return deletedTask;
};

const updateTasks = async (id, task) => {
  const { title, status } = task;

  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

  const [updatedTask] = await connection.execute(query, [title, status, id]);
  return updatedTask;
};

module.exports = {
  getAll,
  createTasks,
  deleteTasks,
  updateTasks
};
