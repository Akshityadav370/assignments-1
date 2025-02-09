let todos = [{ name: 'Akshit', id: Date.now().toString(), completed: false }]; // In-memory storage

export async function getAllTodo(req, res) {
  return res.status(200).json({ todos });
}

export async function createTodo(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Todo name is required' });
  }

  const newTodo = { name, id: Date.now().toString(), completed: false };
  todos.push(newTodo);

  return res
    .status(201)
    .json({ message: 'Todo created successfully!', todo: newTodo });
}

export async function updateTodo(req, res) {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ error: 'ID and name are required for updating' });
  }
  console.log('hi', id);

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[todoIndex].completed = !todos[todoIndex].completed;

  return res
    .status(200)
    .json({ message: 'Todo updated successfully!', todo: todos[todoIndex] });
}

export async function deleteTodo(req, res) {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'ID is required for deletion' });
  }

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];

  return res
    .status(200)
    .json({ message: 'Todo deleted successfully!', todo: deletedTodo });
}

// New function: Delete Todo by ID (from URL params)
export async function deleteTodoById(req, res) {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id == id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];

  return res
    .status(200)
    .json({ message: 'Todo deleted successfully!', todo: deletedTodo });
}
