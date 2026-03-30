import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        target: 'ESNext',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        strict: true,
        jsx: 'preserve',
        paths: {
          '~/*': ['./*'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, '.'),
    },
  },
  test: {
    globals: true,
  },
});
