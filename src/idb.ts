import { INDEXEDDB } from "@/constants";
import type { ObjectType } from "@/types";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("loopchat", INDEXEDDB.version);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      for (const storeKey in INDEXEDDB.stores) {
        const store = INDEXEDDB.stores[storeKey as keyof typeof INDEXEDDB.stores];
        if (store && !db.objectStoreNames.contains(store.name)) {
          db.createObjectStore(store.name, { keyPath: store.keyPath });
        }
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function addItem(storeName: keyof typeof INDEXEDDB.stores, item: ObjectType): Promise<void> {
  const db = await openDB();
  if (!db) throw new Error("Failed to open IndexedDB");
  const storeConfig = INDEXEDDB.stores[storeName];
  if (!storeConfig) throw new Error(`Store ${storeName} does not exist in IndexedDB`);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeConfig.name, "readwrite");
    const store = tx.objectStore(storeConfig.name);
    const req = store.put(item);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function getItem(id: number): Promise<ObjectType | undefined> {
  const db = await openDB();
  if (!db) throw new Error("Failed to open IndexedDB");
  const objectsStore = INDEXEDDB.stores.objects;
  if (!objectsStore) throw new Error("Objects store does not exist in IndexedDB");
  return new Promise((resolve, reject) => {
    const tx = db.transaction(objectsStore.name, "readonly");
    const store = tx.objectStore(objectsStore.name);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result as ObjectType | undefined);
    req.onerror = () => reject(req.error);
  });
}

export default {
  addItem,
  getItem,
};

// ---- Example usage ---- //
// (async () => {
//   await addItem({ id: 1, name: "Kevin", age: 40 });

//   const item = await getItem(1);
//   console.log("Got from DB:", item);
// })();
