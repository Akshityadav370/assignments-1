const API_URL = 'http://localhost:3001/bookmarks';

// Fetch bookmarks when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchBookmarks();
});

// Fetch bookmarks from the backend
function fetchBookmarks() {
  fetch(API_URL)
    .then((res) => res.json)
    .then((bookmarks) =>
      bookmarks.forEach((bookmark) => addBookmarkToDOM(bookmark))
    )
    .catch((error) => console.error('Error fetching the bookmarks:', err));
}

// Add a bookmark to the DOM
async function addBookmarkToDOM(bookmark) {
  if (bookmark) {
    const bookMarkList = document.getElementById('bookmark-list');

    const li = document.createElement('li');
    li.setAttribute('data-id', bookmark.id);

    const link = document.createElement('a');
    link.href = bookmark.link;
    link.innerText = bookmark.link;

    const category = document.createElement('span');
    category.innerText = `(${bookmark.category})`;

    const div = document.createElement('div');
    div.appendChild(link);
    div.appendChild(category);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteBookmark(bookmark.id));

    li.appendChild(div);
    li.appendChild(deleteButton);

    bookMarkList.appendChild(li);
  }
}

// Add a new bookmark
document.getElementById('add-bookmark-btn').addEventListener('click', () => {
  const url = document.getElementById('bookmark-url');
  const category = document.getElementById('bookmark-category');

  if (!url || !category) return alert('Enter values');

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ link: url, category }),
  })
    .then((res) => res.json())
    .then((bookmark) => {
      addBookmarkToDOM(bookmark);
      url.value = '';
      category.value = '';
    })
    .catch((error) => console.error('Error adding Bookmark:', error));
});

// Delete a bookmark
function deleteBookmark(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
    .then(fetchBookmarks())
    .catch((error) => console.error('Error deleting the bookmark'));
}
