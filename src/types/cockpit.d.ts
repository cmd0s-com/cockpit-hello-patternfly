
interface CockpitFile {
  read(): Promise<string>;
  replace(content: string): Promise<void>;
  modify(callback: (content: string) => string): Promise<void>;
}

interface CockpitSpawnProcess {
  done(callback: (data: string) => void): CockpitSpawnProcess;
  fail(callback: (ex: any) => void): CockpitSpawnProcess;
  stream(callback: (data: string) => void): CockpitSpawnProcess;
  input(data: string | Uint8Array): CockpitSpawnProcess;
  close(): void;
}

interface CockpitLocale {
  language: string;
  format(format: string, ...args: any[]): string;
}

interface Cockpit {
  file(path: string): CockpitFile;
  spawn(args: string[], options?: any): CockpitSpawnProcess;
  locale(language?: string): CockpitLocale;
  format(format: string, ...args: any[]): string;
  location: {
    href: string;
    path: string;
    go(loc: string): void;
  };
  logout(): void;
}

declare global {
  interface Window {
    cockpit?: Cockpit;
  }
}

export {};
