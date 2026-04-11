/** biome-ignore-all lint/suspicious/noExplicitAny: <chrome mock> */

import mockChrome from './chrome';

const mock = () => {
  if (typeof MOCK_CHROME !== 'undefined' && MOCK_CHROME) {
    (window as any).chrome = mockChrome;
  }
};

export default mock;
