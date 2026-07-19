import { defineConfig } from 'tsup';

// Entry lives under react/ because this repo ships two layers from one root: the
// framework-free kit (lzt-ui.css / lzt-ui.js / lzt-icons.js, referenced straight
// from package.json "exports") and the React bindings compiled here into dist/.
export default defineConfig({
  entry: ['react/src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
});
