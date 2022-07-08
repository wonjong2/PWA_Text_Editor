import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const todosDb = await openDB('jate', 1);
  const tx = todosDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  return result.length ? result[0].value : null;
}

initdb();
