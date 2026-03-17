// Node.js 22+ has a built-in localStorage with a limited API that overrides
// the DOM environment's implementation. Replace it with a simple in-memory
// implementation so tests can use the full Storage interface.
const store = new Map<string, string>();

const memoryStorage: Storage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => {
    store.set(key, String(value));
  },
  removeItem: (key: string) => {
    store.delete(key);
  },
  clear: () => {
    store.clear();
  },
  key: (index: number) => [...store.keys()][index] ?? null,
  get length() {
    return store.size;
  },
};

Object.defineProperty(globalThis, "localStorage", {
  value: memoryStorage,
  writable: true,
  configurable: true,
});
