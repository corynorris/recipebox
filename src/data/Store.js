const storage = window.localStorage;

export default class Store {
  constructor(storageKey, defaultData = null) {
    this.storageKey = storageKey;
    if (typeof (Storage) !== "undefined") {
      this.storageKey = storageKey;

      if (this.isEmpty() && (null !== defaultData)) {
        console.log('setting defaults');
        this.set(defaultData);
      }

    } else {
      throw new Error('Storage not supported');
    }
  }

  isEmpty() {
    return null === this.get();
  }

  setItem(item) {
    storage.setItem(this.storageKey, JSON.stringify({
      ...this.get(),
      ...item,
    }));
  }

  set(data) {
    storage.setItem(this.storageKey, JSON.stringify(data));
  }

  get() {
    const rawData = storage.getItem(this.storageKey);
    return JSON.parse(rawData);
  }
}