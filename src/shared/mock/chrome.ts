/** biome-ignore-all lint/suspicious/noExplicitAny: <chrome mock> */

type StorageChangeListener = (changes: Record<string, { oldValue?: any; newValue?: any }>, area: string) => void;

const onChangedListeners: StorageChangeListener[] = [];

const createLocalStorage = () => ({
  get: (keys: string | string[], callback: (result: Record<string, any>) => void) => {
    const keyArray = Array.isArray(keys) ? keys : [keys];
    const result = keyArray.reduce(
      (acc, key) => {
        const raw = localStorage.getItem(`local:${key}`);
        if (raw !== null) {
          try {
            acc[key] = JSON.parse(raw);
          } catch {
            acc[key] = raw;
          }
        }
        return acc;
      },
      {} as Record<string, any>
    );
    callback(result);
  },
  set: (items: Record<string, any>, callback?: () => void) => {
    const changes: Record<string, { oldValue?: any; newValue?: any }> = {};
    Object.entries(items).forEach(([key, value]) => {
      const raw = localStorage.getItem(`local:${key}`);
      const oldValue = raw !== null ? JSON.parse(raw) : undefined;
      localStorage.setItem(`local:${key}`, JSON.stringify(value));
      changes[key] = { oldValue, newValue: value };
    });
    onChangedListeners.forEach((l) => {
      l(changes, 'local');
    });
    if (callback) callback();
  },
});

const mockChrome = {
  storage: {
    sync: {
      get: (keys: string[], callback: (result: { [key: string]: string | null }) => void) => {
        const mockData = keys.reduce(
          (acc, key) => {
            acc[key] = localStorage.getItem(key) || null;
            return acc;
          },
          {} as { [key: string]: string | null }
        );

        callback(mockData);
      },
      set: (items: { [key: string]: string }, callback?: () => void) => {
        Object.entries(items).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        if (callback) callback();
      },
    },
    local: createLocalStorage(),
    onChanged: {
      addListener: (listener: StorageChangeListener) => {
        onChangedListeners.push(listener);
      },
      removeListener: (listener: StorageChangeListener) => {
        const idx = onChangedListeners.indexOf(listener);
        if (idx !== -1) onChangedListeners.splice(idx, 1);
      },
    },
  },
};

export default mockChrome;
