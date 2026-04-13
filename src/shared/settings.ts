export interface Settings {
  showClock: boolean;
  showTodo: boolean;
  showFloatingPanel: boolean;
  clockFormat: '12' | '24';
  theme: 'dark' | 'light';
}

export const DEFAULT_SETTINGS: Settings = {
  showClock: true,
  showTodo: true,
  showFloatingPanel: true,
  clockFormat: '24',
  theme: 'dark',
};

export const SETTINGS_KEYS = Object.keys(DEFAULT_SETTINGS) as (keyof Settings)[];
