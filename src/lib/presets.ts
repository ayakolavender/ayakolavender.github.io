/**
 * Theme presets. Each preset defines a full light + dark palette plus default
 * fonts. Users pick one in content/theme.yml and may override `accent`,
 * `radius`, and `font`. Adding a new preset here is the only code change needed
 * to offer a new look.
 */
export interface Palette {
  bg: string;
  surface: string;
  surface2: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentText: string;
}

export interface Preset {
  light: Palette;
  dark: Palette;
  font: { body: string; heading: string };
}

export const presets: Record<string, Preset> = {
  classic: {
    font: { body: 'Inter', heading: 'Playfair Display' },
    light: {
      bg: '#ffffff', surface: '#ffffff', surface2: '#f5f5f7',
      text: '#1a1a1e', muted: '#5f6470', border: '#e6e6ea',
      accent: '#4f46e5', accentText: '#ffffff',
    },
    dark: {
      bg: '#0d0d10', surface: '#16161b', surface2: '#1e1e25',
      text: '#ededf2', muted: '#a1a1ad', border: '#2a2a33',
      accent: '#8b85f5', accentText: '#0d0d10',
    },
  },
  midnight: {
    font: { body: 'Inter', heading: 'Inter' },
    light: {
      bg: '#f8fafc', surface: '#ffffff', surface2: '#eef2f7',
      text: '#0f172a', muted: '#54607a', border: '#dbe2ec',
      accent: '#2563eb', accentText: '#ffffff',
    },
    dark: {
      bg: '#0b1020', surface: '#121a30', surface2: '#1a2540',
      text: '#e8eefc', muted: '#94a3c4', border: '#243150',
      accent: '#56b6ff', accentText: '#06101f',
    },
  },
  warm: {
    font: { body: 'Source Sans 3', heading: 'Source Serif 4' },
    light: {
      bg: '#fbf8f2', surface: '#fffdf8', surface2: '#f1ebdf',
      text: '#2c2620', muted: '#6f6457', border: '#e7ddca',
      accent: '#c2622d', accentText: '#ffffff',
    },
    dark: {
      bg: '#1b1714', surface: '#241f1a', surface2: '#2e2820',
      text: '#f0e8dc', muted: '#b3a591', border: '#3a3228',
      accent: '#e0894c', accentText: '#1b1714',
    },
  },
  ocean: {
    font: { body: 'Inter', heading: 'Lora' },
    light: {
      bg: '#ffffff', surface: '#ffffff', surface2: '#eef6f6',
      text: '#102a2a', muted: '#4d6b6b', border: '#d7e6e6',
      accent: '#0d9488', accentText: '#ffffff',
    },
    dark: {
      bg: '#07171a', surface: '#0e2227', surface2: '#143038',
      text: '#e0f2f1', muted: '#8fb3b3', border: '#1d3b42',
      accent: '#2dd4bf', accentText: '#06201d',
    },
  },
};

export const DEFAULT_PRESET = 'classic';
