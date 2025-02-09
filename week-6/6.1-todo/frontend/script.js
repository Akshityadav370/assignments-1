const API_URL = 'http://localhost:3001/todos';
const todosList = document.getElementById('todo-list');

async function fetchTodos() {
  try {
    const response = await fetch(`${API_URL}`, { method: 'GET' });
    const res = await response.json();
    if (response.ok) {
      todosList.innerHTML = '';
      for (const item of res.todos) {
        const li = document.createElement('li');
        li.id = item.id;

        li.innerHTML = `
          <input type="checkbox" class="toggle-checkbox" ${
            item.completed ? 'checked' : ''
          }>
          <p class="${item.completed ? 'completed' : ''}">${item.name}</p>
          <button class="delete-btn">Delete</button>`;

        todosList.appendChild(li);

        const checkbox = li.querySelector('.toggle-checkbox');
        checkbox.addEventListener('change', () =>
          toggleTodo(item.id, checkbox.checked)
        );

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
          deleteTodo(item.id);
        });
      }
    }
  } catch (error) {
    console.error('Error fetching the todos', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchTodos();
});

// Add a new todo to the DOM
function addTodoToDOM(todo) {}

document.getElementById('add-todo-btn').addEventListener('click', async () => {
  const task = document.getElementById('todo-input').value.trim();
  if (!task) {
    alert('Please enter a task!');
    return;
  }

  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: task }),
    });

    if (!response.ok) {
      throw new Error('Failed to add todo');
    }

    await fetchTodos();
    document.getElementById('todo-input').value = '';
  } catch (error) {
    console.error('Error adding todo:', error);
  }
});

async function toggleTodo(id, completed) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
    });
    if (res.ok) {
      await fetchTodos();
    }
  } catch (error) {
    console.error('Error updating todo:', error);
  }
}

// Delete a todo
async function deleteTodo(id) {
  const listItem = document.getElementById(id);
  if (!listItem) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      await fetchTodos();
    }
  } catch (error) {
    console.error('Error Deleting the Todo');
  }
}
