let bookmarks = [{ link: 'hi', category: 'hello', id: Date.now() }]; // in memory space

export async function addBookmark(req, res, next) {
  const { link, category } = req.body;
  if (!link || !category) {
    return res.status(404).json({ message: 'No proper data give!' });
  }

  const bookmark = { link, category, id: Date.now().toString() };
  bookmarks.push(bookmark);
  return res.status(200).json({ message: 'Added Bookmark', bookmark });
}

export async function deleteBookmark(req, res, next) {
  const { id } = req.param;
  if (!id) {
    return res
      .status(400)
      .json({ error: 'ID and name are required for updating' });
  }

  const bookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.id === id);
  if (bookmarkIndex === -1) {
    return res.status(404).json({ error: 'Bookmark not found' });
  }

  const deletedTodo = bookmarks.splice(bookmarkIndex, 1)[0];

  return res.status(200).json({ message: 'Bookmark deleted successfully!' });
}

export async function getAllBookmarks(req, res, next) {
  return res.status(200).json({ bookmarks: bookmarks });
}
