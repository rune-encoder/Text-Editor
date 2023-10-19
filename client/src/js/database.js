import { openDB } from "idb";

// Function to initialize the database.
const initdb = async () =>
// Open the "jate" database with version 1.
  openDB("jate", 1, {
    upgrade(db) {
      // Check if the object store "jate" already exists in the database.
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // If the object store doesn't exist, create it with a keyPath of "id" and auto-increment.
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Function to add data to the database.
export const putDb = async (content) => {
  try {
    // Open the "jate" database with version 1.
    const db = await openDB("jate", 1);
    // Start a read-write transaction on the "jate" object store.
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    // Put the content into the object store with a specified key of 1 (auto-incremented).
    const request = store.put({ id: 1, content });
    const result = await request;
    console.log("Data saved to the database", result);
  } catch (err) {
    console.error("Error on putDb:", err);
  }
};

// TODO: Add logic for a method that gets all the content from the database
// Function to get data from the database.
export const getDb = async () => {
  try {
    // Open the "jate" database with version 1.
    const db = await openDB("jate", 1);
    // Start a read-only transaction on the "jate" object store.
    const tx = db.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    // Get the data associated with the key "1" (in this case, it's auto-incremented).
    const request = store.get(1);
    const result = await request
    console.log("Data retrieved from the database", result);
    return result.content;
  } catch (err) {
    console.error("Error on getDb:", err);
  }
};

initdb();
