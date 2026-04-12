/** biome-ignore-all lint/suspicious/noExplicitAny: <chrome mock> */
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
  },
};

export default mockChrome;
