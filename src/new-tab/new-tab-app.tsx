import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, SETTINGS_KEYS, type Settings } from '@/shared/settings';
import { Clock, Todo } from './components';

export const NewTabApp = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    chrome.storage.local.get(SETTINGS_KEYS, (result) => {
      setSettings({
        ...DEFAULT_SETTINGS,
        ...(result as Partial<Settings>),
      });
    });

    const listener = (changes: Record<string, { oldValue?: unknown; newValue?: unknown }>, area: string) => {
      if (area !== 'local') return;
      setSettings((prev) => {
        const patch = Object.fromEntries(
          SETTINGS_KEYS.filter((k) => k in changes).map((k) => [k, changes[k].newValue])
        ) as Partial<Settings>;
        return { ...prev, ...patch };
      });
    };

    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  return (
    <div>
      {settings.showTodo && <Todo />}
      {settings.showClock && <Clock format={settings.clockFormat} />}
    </div>
  );
};
