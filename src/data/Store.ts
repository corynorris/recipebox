const storage: Storage = window.localStorage;

export default class Store<T = Record<string, unknown>> {
  private storageKey: string;

  constructor(storageKey: string, defaultData: T | null = null) {
    this.storageKey = storageKey;
    if (typeof Storage === "undefined") {
      throw new Error("Storage not supported");
    }

    if (this.isEmpty() && defaultData !== null) {
      this.set(defaultData);
    }
  }

  isEmpty(): boolean {
    return this.get() === null;
  }

  setItem(item: Partial<T>): void {
    const current = this.get();
    storage.setItem(this.storageKey, JSON.stringify({ ...current, ...item }));
  }

  set(data: T): void {
    storage.setItem(this.storageKey, JSON.stringify(data));
  }

  get(): T | null {
    const rawData = storage.getItem(this.storageKey);
    if (rawData === null) return null;
    return JSON.parse(rawData) as T;
  }
}
